const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting RescueBite Database Seed...");

  // Clean existing data
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.message.deleteMany();
  await prisma.pickupRequest.deleteMany();
  await prisma.collector.deleteMany();
  await prisma.recyclingCentre.deleteMany();
  await prisma.wasteItem.deleteMany();
  await prisma.deliveryRecord.deleteMany();
  await prisma.match.deleteMany();
  await prisma.foodListing.deleteMany();
  await prisma.ngoProfile.deleteMany();
  await prisma.volunteerProfile.deleteMany();
  await prisma.donorProfile.deleteMany();
  await prisma.cmsSetting.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Cleaned database tables.");

  const hashedPw = await bcrypt.hash("password123", 10);
  const adminPw = await bcrypt.hash("admin123", 10);
  const donorPw = await bcrypt.hash("donor123", 10);
  const volunteerPw = await bcrypt.hash("volunteer123", 10);
  const ngoPw = await bcrypt.hash("ngo123", 10);

  // 1. Seed Core Demo Users
  const adminUser = await prisma.user.create({
    data: {
      name: "RescueBite Admin",
      email: "admin@rescuebite.in",
      passwordHash: adminPw,
      role: "ADMIN",
      phone: "+91 98765 43210",
      city: "Indore",
      lat: 22.7196,
      lng: 75.8577,
      isVerified: true,
      karma: 9999,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
  });

  const donorUser = await prisma.user.create({
    data: {
      name: "Sayaji Hotels & Banquets",
      email: "donor@sayaji.com",
      passwordHash: donorPw,
      role: "DONOR",
      phone: "+91 98765 11223",
      city: "Indore",
      lat: 22.7523,
      lng: 75.8937,
      isVerified: true,
      karma: 1250,
      avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80",
      donorProfile: {
        create: {
          businessName: "Sayaji Hotels Ltd.",
          businessType: "Hotel",
          fssaiLicense: "11421850000123",
          address: "H-1, Scheme No. 54, Vijay Nagar, Indore",
          landmark: "Near Meghdoot Garden",
        },
      },
    },
  });

  const volunteerUser = await prisma.user.create({
    data: {
      name: "Karan Sharma",
      email: "volunteer@rescuebite.in",
      passwordHash: volunteerPw,
      role: "VOLUNTEER",
      phone: "+91 98765 33445",
      city: "Indore",
      lat: 22.7300,
      lng: 75.8700,
      isVerified: true,
      karma: 4250,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      volunteerProfile: {
        create: {
          vehicleType: "Motorcycle",
          isAvailable: true,
          availabilityHours: "Morning & Evening",
          emergencyRescuer: true,
          rating: 4.95,
          totalDeliveries: 42,
        },
      },
    },
  });

  const ngoUser = await prisma.user.create({
    data: {
      name: "Robin Hood Army - Indore Chapter",
      email: "ngo@robinhoodarmy.org",
      passwordHash: ngoPw,
      role: "NGO",
      phone: "+91 98765 55667",
      city: "Indore",
      lat: 22.7150,
      lng: 75.8650,
      isVerified: true,
      karma: 8600,
      avatar: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=150&q=80",
      ngoProfile: {
        create: {
          orgName: "Robin Hood Army Indore",
          darpanId: "MP/2021/028491",
          registrationNo: "RHA-IND-4421",
          capacityKgPerDay: 400,
          beneficiariesCount: 350,
          foodPreferences: "All",
          coldStorageAvailable: true,
          isGovtRecognized: true,
        },
      },
    },
  });

  // Additional realistic actors
  const additionalDonors = [
    {
      name: "Grand Royal Palace Banquets",
      email: "info@grandroyal.in",
      city: "Delhi NCR",
      lat: 28.6250,
      lng: 77.2100,
      type: "Marriage Hall / Banquet",
      address: "Ring Road, Central Delhi",
      karma: 3400,
    },
    {
      name: "Taveena Cloud Kitchen",
      email: "taveena@cloudkitchen.in",
      city: "Indore",
      lat: 22.7244,
      lng: 75.8839,
      type: "Caterer",
      address: "Geeta Bhawan Square, AB Road, Indore",
      karma: 1850,
    },
    {
      name: "JW Marriott Sahar",
      email: "csr@marriottsahar.com",
      city: "Mumbai Central",
      lat: 19.0990,
      lng: 72.8750,
      type: "Hotel",
      address: "IA Project Road, Chhatrapati Shivaji Airport, Mumbai",
      karma: 5120,
    },
    {
      name: "The Leela Palace Catering",
      email: "sustainability@theleela.com",
      city: "Bangalore Hub",
      lat: 12.9606,
      lng: 77.6484,
      type: "Hotel",
      address: "Old Airport Road, Kodihalli, Bengaluru",
      karma: 4900,
    },
    {
      name: "Bhopal Lakeview Convention",
      email: "contact@lakeviewbhopal.org",
      city: "Bhopal",
      lat: 23.2324,
      lng: 77.4028,
      type: "Event Organizer",
      address: "Shamla Hills, Bhopal",
      karma: 2100,
    },
  ];

  const createdDonors = [];
  for (const d of additionalDonors) {
    const u = await prisma.user.create({
      data: {
        name: d.name,
        email: d.email,
        passwordHash: hashedPw,
        role: "DONOR",
        phone: "+91 98" + Math.floor(10000000 + Math.random() * 90000000),
        city: d.city,
        lat: d.lat,
        lng: d.lng,
        isVerified: true,
        karma: d.karma,
        donorProfile: {
          create: {
            businessName: d.name,
            businessType: d.type,
            fssaiLicense: "100" + Math.floor(10000000000 + Math.random() * 90000000000),
            address: d.address,
          },
        },
      },
    });
    createdDonors.push(u);
  }

  // Additional Volunteers
  const additionalVolunteers = [
    { name: "Rahul Verma", email: "rahul.v@gmail.com", city: "Indore", lat: 22.7210, lng: 75.8600, vehicle: "Motorcycle", karma: 3100 },
    { name: "Simran Kaur", email: "simran.k@gmail.com", city: "Indore", lat: 22.7350, lng: 75.8750, vehicle: "Scooter", karma: 1980 },
    { name: "Amitabh Sen", email: "amitabh.sen@delhicourier.in", city: "Delhi NCR", lat: 28.6200, lng: 77.2150, vehicle: "Car", karma: 2750 },
    { name: "Priya Deshmukh", email: "priya.desh@mumbaicare.org", city: "Mumbai Central", lat: 19.0800, lng: 72.8600, vehicle: "Van", karma: 4100 },
    { name: "Rohan Kulkarni", email: "rohan.k@puneaid.org", city: "Pune City", lat: 18.5204, lng: 73.8567, vehicle: "Motorcycle", karma: 1650 },
  ];

  const createdVolunteers = [];
  for (const v of additionalVolunteers) {
    const u = await prisma.user.create({
      data: {
        name: v.name,
        email: v.email,
        passwordHash: hashedPw,
        role: "VOLUNTEER",
        phone: "+91 97" + Math.floor(10000000 + Math.random() * 90000000),
        city: v.city,
        lat: v.lat,
        lng: v.lng,
        isVerified: true,
        karma: v.karma,
        volunteerProfile: {
          create: {
            vehicleType: v.vehicle,
            isAvailable: true,
            emergencyRescuer: true,
            rating: 4.9,
            totalDeliveries: Math.floor(v.karma / 100),
          },
        },
      },
    });
    createdVolunteers.push(u);
  }

  // Additional NGOs
  const additionalNgos = [
    { name: "Indore Food Bank & Child Care", email: "reach@indorefoodbank.org", city: "Indore", lat: 22.7080, lng: 75.8500, cap: 300, ben: 260 },
    { name: "Feeding India Shelter Home", email: "care@feedingbhopal.org", city: "Bhopal", lat: 23.2450, lng: 77.4100, cap: 250, ben: 200 },
    { name: "Asha Jyoti Foundation", email: "trust@ashajyoti.org", city: "Delhi NCR", lat: 28.6300, lng: 77.2200, cap: 600, ben: 500 },
    { name: "Roti Bank Mumbai", email: "contact@rotibankmumbai.org", city: "Mumbai Central", lat: 19.0700, lng: 72.8500, cap: 800, ben: 750 },
    { name: "Bangalore Child Seva Trust", email: "seva@childtrust.org", city: "Bangalore Hub", lat: 12.9716, lng: 77.5946, cap: 350, ben: 300 },
  ];

  const createdNgos = [];
  for (const n of additionalNgos) {
    const u = await prisma.user.create({
      data: {
        name: n.name,
        email: n.email,
        passwordHash: hashedPw,
        role: "NGO",
        phone: "+91 96" + Math.floor(10000000 + Math.random() * 90000000),
        city: n.city,
        lat: n.lat,
        lng: n.lng,
        isVerified: true,
        karma: 6200,
        ngoProfile: {
          create: {
            orgName: n.name,
            darpanId: "NGO/2022/0" + Math.floor(10000 + Math.random() * 90000),
            registrationNo: "REG-" + Math.floor(1000 + Math.random() * 9000),
            capacityKgPerDay: n.cap,
            beneficiariesCount: n.ben,
            foodPreferences: "All",
            coldStorageAvailable: true,
            isGovtRecognized: true,
          },
        },
      },
    });
    createdNgos.push(u);
  }

  console.log("👥 Seeded demo users and profiles.");

  // 2. Seed Realistic Food Listings with Different Statuses
  const listingsData = [
    {
      donorId: donorUser.id,
      title: "Paneer Butter Masala, Jeera Rice & Naan",
      category: "cooked",
      isVeg: true,
      quantityKg: 60.0,
      approxServings: 180,
      status: "AVAILABLE",
      freshnessScore: 96.5,
      aiVerdict: "GENUINE",
      aiReasoning: "Freshly prepared banquet surplus. Maintained in insulated hot containers at 68°C. Fully FSSAI compliant.",
      isEmergency: false,
      lat: 22.7523,
      lng: 75.8937,
      address: "Sayaji Hotels, Vijay Nagar, Indore",
      landmark: "Near Meghdoot Garden",
      pickupWindowStart: "11:00 AM",
      pickupWindowEnd: "02:30 PM",
      storageCondition: "Hot-holding",
      allergens: "Dairy, Gluten",
      photos: JSON.stringify(["https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"]),
      deliveryPin: "4821",
    },
    {
      donorId: createdDonors[1].id, // Taveena Cloud Kitchen, Indore
      title: "Dal Makhani, Mixed Veg & Roti",
      category: "cooked",
      isVeg: true,
      quantityKg: 35.0,
      approxServings: 110,
      status: "IN_TRANSIT",
      freshnessScore: 92.0,
      aiVerdict: "GENUINE",
      aiReasoning: "Lunch batch surplus, sealed in food-grade aluminum tins. Prepared 2 hours ago.",
      isEmergency: false,
      lat: 22.7244,
      lng: 75.8839,
      address: "Taveena Cloud Kitchen, Geeta Bhawan, Indore",
      landmark: "Opp. City Mall",
      pickupWindowStart: "01:00 PM",
      pickupWindowEnd: "03:30 PM",
      storageCondition: "Insulated",
      allergens: "Dairy",
      photos: JSON.stringify(["https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"]),
      deliveryPin: "7193",
    },
    {
      donorId: donorUser.id,
      title: "Kadi Chawal & Aloo Gobi Combo (Urgent)",
      category: "cooked",
      isVeg: true,
      quantityKg: 20.0,
      approxServings: 60,
      status: "AVAILABLE",
      freshnessScore: 84.0,
      aiVerdict: "GENUINE",
      aiReasoning: "Hot meal surplus. Needs urgent pickup within 90 minutes to comply with thermal window.",
      isEmergency: true,
      lat: 22.7410,
      lng: 75.8800,
      address: "Sayaji Executive Kitchen, Palasia, Indore",
      landmark: "Old Palasia Circle",
      pickupWindowStart: "Immediate",
      pickupWindowEnd: "01:30 PM",
      storageCondition: "Insulated",
      allergens: "None",
      photos: JSON.stringify(["https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"]),
      deliveryPin: "3182",
    },
    {
      donorId: createdDonors[0].id, // Grand Royal Palace, Delhi
      title: "Wedding Reception Buffet: Paneer Butter Masala, Pulao, Dal",
      category: "cooked",
      isVeg: true,
      quantityKg: 120.0,
      approxServings: 360,
      status: "SUBMITTED",
      freshnessScore: 98.0,
      aiVerdict: "GENUINE",
      aiReasoning: "Pristine unopened chafer pans from luxury banquet. Clean photo verification shows steam and unhandled surfaces.",
      isEmergency: false,
      lat: 28.6250,
      lng: 77.2100,
      address: "Grand Royal Palace, Central Delhi",
      landmark: "Near Connaught Place Outer Ring",
      pickupWindowStart: "10:30 AM",
      pickupWindowEnd: "01:00 PM",
      storageCondition: "Hot-holding",
      allergens: "Dairy, Cashew",
      photos: JSON.stringify(["https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80"]),
      deliveryPin: "9041",
    },
    {
      donorId: createdDonors[2].id, // JW Marriott Sahar, Mumbai
      title: "Continental Breakfast & Bakery Baskets: Croissants, Breads & Muffins",
      category: "bakery",
      isVeg: true,
      quantityKg: 45.0,
      approxServings: 140,
      status: "VERIFIED",
      freshnessScore: 95.0,
      aiVerdict: "GENUINE",
      aiReasoning: "Baked today 06:00 AM. Stored in temperature-controlled pastry drawers.",
      isEmergency: false,
      lat: 19.0990,
      lng: 72.8750,
      address: "JW Marriott Sahar, Andheri East, Mumbai",
      landmark: "Near T2 Terminal",
      pickupWindowStart: "11:30 AM",
      pickupWindowEnd: "03:00 PM",
      storageCondition: "Ambient",
      allergens: "Gluten",
      photos: JSON.stringify(["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"]),
      deliveryPin: "5512",
    },
    {
      donorId: createdDonors[3].id, // The Leela Palace, Bangalore
      title: "South Indian Special: Sambar, Idli, Vada, Chutney",
      category: "cooked",
      isVeg: true,
      quantityKg: 75.0,
      approxServings: 220,
      status: "DELIVERED",
      freshnessScore: 99.0,
      aiVerdict: "GENUINE",
      aiReasoning: "Morning buffet surplus distributed successfully.",
      isEmergency: false,
      lat: 12.9606,
      lng: 77.6484,
      address: "The Leela Palace, Old Airport Road, Bangalore",
      landmark: "Kodihalli Junction",
      pickupWindowStart: "09:30 AM",
      pickupWindowEnd: "11:30 AM",
      storageCondition: "Hot-holding",
      allergens: "Mustard, Coconut",
      photos: JSON.stringify(["https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"]),
      deliveryPin: "2940",
    },
    {
      donorId: createdDonors[4].id, // Bhopal Lakeview
      title: "Vegetable Biryani & Mirchi Ka Salan",
      category: "cooked",
      isVeg: true,
      quantityKg: 50.0,
      approxServings: 150,
      status: "MATCHED",
      freshnessScore: 91.5,
      aiVerdict: "GENUINE",
      aiReasoning: "Large convention lunch surplus. High quality long-grain basmati.",
      isEmergency: false,
      lat: 23.2324,
      lng: 77.4028,
      address: "Lakeview Convention Centre, Shamla Hills, Bhopal",
      landmark: "Near Van Vihar Road",
      pickupWindowStart: "02:00 PM",
      pickupWindowEnd: "04:30 PM",
      storageCondition: "Insulated",
      allergens: "Peanut",
      photos: JSON.stringify(["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"]),
      deliveryPin: "6732",
    },
    {
      donorId: donorUser.id,
      title: "Mixed Fruit Crates: Apples, Oranges & Bananas",
      category: "raw_produce",
      isVeg: true,
      quantityKg: 85.0,
      approxServings: 250,
      status: "AVAILABLE",
      freshnessScore: 94.0,
      aiVerdict: "GENUINE",
      aiReasoning: "Whole unblemished fresh produce from banquet center inventory.",
      isEmergency: false,
      lat: 22.7610,
      lng: 75.8980,
      address: "Sayaji Logistics Warehouse, Vijay Nagar, Indore",
      landmark: "Near Bombay Hospital",
      pickupWindowStart: "10:00 AM",
      pickupWindowEnd: "05:00 PM",
      storageCondition: "Ambient",
      allergens: "None",
      photos: JSON.stringify(["https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80"]),
      deliveryPin: "1948",
    },
  ];

  const createdListings = [];
  for (const item of listingsData) {
    const l = await prisma.foodListing.create({
      data: {
        donorId: item.donorId,
        title: item.title,
        category: item.category,
        isVeg: item.isVeg,
        quantityKg: item.quantityKg,
        approxServings: item.approxServings,
        cookedAt: new Date(Date.now() - 2 * 3600 * 1000),
        expiresAt: new Date(Date.now() + 6 * 3600 * 1000),
        pickupWindowStart: item.pickupWindowStart,
        pickupWindowEnd: item.pickupWindowEnd,
        storageCondition: item.storageCondition,
        allergens: item.allergens,
        photos: item.photos,
        status: item.status,
        freshnessScore: item.freshnessScore,
        aiVerdict: item.aiVerdict,
        aiReasoning: item.aiReasoning,
        isEmergency: item.isEmergency,
        lat: item.lat,
        lng: item.lng,
        address: item.address,
        landmark: item.landmark,
        deliveryPin: item.deliveryPin,
      },
    });
    createdListings.push(l);
  }

  console.log("🍲 Seeded food listings across Indore, Delhi, Mumbai, Bangalore, Bhopal.");

  // 3. Seed Matches and Delivery Records
  // Match for IN_TRANSIT listing (Dal Makhani)
  const inTransitListing = createdListings[1];
  await prisma.match.create({
    data: {
      listingId: inTransitListing.id,
      volunteerId: volunteerUser.id,
      ngoId: ngoUser.id,
      matchScore: 97.4,
      status: "ACCEPTED",
    },
  });

  // Completed Delivery for The Leela Palace
  const deliveredListing = createdListings[5];
  await prisma.deliveryRecord.create({
    data: {
      listingId: deliveredListing.id,
      donorId: createdDonors[3].id,
      volunteerId: volunteerUser.id,
      ngoId: createdNgos[4].id,
      quantityKg: 75.0,
      mealsServed: 225,
      co2SavedKg: 187.5,
      waterSavedLiters: 37500,
      pickupPhotoUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
      dropPhotoUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      deliveryPinVerified: true,
      receiptNumber: "RB-80G-2026-IND-00128",
      completedAt: new Date(Date.now() - 4 * 3600 * 1000),
    },
  });

  // 4. Seed Waste Management Collectors & Recycling Centers
  const collectorsData = [
    {
      name: "Swachh Indore E-Waste & Metal Recyclers",
      organization: "Indore Municipal Corporation Partner",
      phone: "+91 98260 12345",
      city: "Indore",
      address: "Sector F, Sanwer Road Industrial Area, Indore",
      lat: 22.7680,
      lng: 75.8450,
      materialsAccepted: "E-waste, Metals, Batteries, Hard Plastics",
      isVerified: true,
      rating: 4.9,
      openingHours: "09:00 AM - 07:00 PM",
    },
    {
      name: "GreenEarth Dry Waste Recovery Facility",
      organization: "Zero Landfill Alliance",
      phone: "+91 98260 67890",
      city: "Indore",
      address: "Devguradia Trenching Ground MRF, Indore",
      lat: 22.6850,
      lng: 75.9250,
      materialsAccepted: "Paper, Cardboard, PET Bottles, Multilayer Plastics",
      isVerified: true,
      rating: 4.8,
      openingHours: "08:00 AM - 06:00 PM",
    },
    {
      name: "Bhopal EcoCircle Recyclers",
      organization: "Bhopal Smart City Circular Mission",
      phone: "+91 98270 54321",
      city: "Bhopal",
      address: "Govindpura Industrial Area, Bhopal",
      lat: 23.2550,
      lng: 77.4500,
      materialsAccepted: "All Recyclables, Glass, Cardboard, Metals",
      isVerified: true,
      rating: 4.7,
      openingHours: "09:30 AM - 06:30 PM",
    },
    {
      name: "Chintan Environmental Research & Action Group",
      organization: "Authorized E-Waste & Plastic Aggregator",
      phone: "+91 98110 99887",
      city: "Delhi NCR",
      address: "Okhla Industrial Area Phase 1, New Delhi",
      lat: 28.5300,
      lng: 77.2700,
      materialsAccepted: "E-waste, Plastics, Lead batteries, Paper",
      isVerified: true,
      rating: 4.9,
      openingHours: "09:00 AM - 06:00 PM",
    },
  ];

  for (const c of collectorsData) {
    await prisma.collector.create({ data: c });
  }

  const recyclingCentresData = [
    {
      name: "Indore Asia's Largest Bio-CNG & Composting Plant (Gobar-Dhan)",
      facilityType: "Composting & Bio-CNG",
      phone: "+91 731 254 4444",
      city: "Indore",
      address: "Devguradia, Nemawar Road, Indore",
      lat: 22.6820,
      lng: 75.9320,
      capacityTons: 550.0,
      materials: "Wet organic waste, kitchen peels, food scraps, banquet leftovers",
    },
    {
      name: "Shri Mahavir Plastic Granulation Works",
      facilityType: "Plastic Granulation",
      phone: "+91 731 280 1122",
      city: "Indore",
      address: "Pologround Industrial Estate, Indore",
      lat: 22.7420,
      lng: 75.8520,
      capacityTons: 40.0,
      materials: "HDPE, LDPE, PP, PET bottles, containers",
    },
    {
      name: "Central India Paper Pulp & Board Mills",
      facilityType: "Paper Mill",
      phone: "+91 731 278 9900",
      city: "Indore",
      address: "Sanwer Road Industrial Area, Indore",
      lat: 22.7800,
      lng: 75.8390,
      capacityTons: 120.0,
      materials: "Cardboard cartons, newspapers, white office paper, kraft paper",
    },
  ];

  for (const rc of recyclingCentresData) {
    await prisma.recyclingCentre.create({ data: rc });
  }

  console.log("♻️ Seeded collectors and recycling facilities.");

  // 5. Seed Initial CMS Settings
  const defaultCms = [
    { key: "helpline_phone", value: "+91 97708 69581" },
    { key: "helpline_email", value: "hello@rescuebite.in" },
    { key: "hero_badge", value: "Good Samaritan & FSSAI Compliant" },
    { key: "hero_h1", value: "No food wasted. No one left hungry." },
    { key: "hero_subtext", value: "RescueBite bridges restaurants, hotels, caterers, grocery stores and households with local NGOs, verified volunteers and recyclers across India in real time." },
    { key: "kg_rescued_offset", value: "10450" },
    { key: "meals_enabled_offset", value: "31350" },
    { key: "active_volunteers_offset", value: "520" },
    { key: "co2_saved_offset", value: "26125" },
  ];

  for (const s of defaultCms) {
    await prisma.cmsSetting.create({ data: s });
  }

  // 6. Seed In-app Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: volunteerUser.id,
        title: "Active Pickup Assigned",
        message: "You have been matched to pick up 35 kg Dal Makhani from Taveena Cloud Kitchen.",
        type: "MATCH_ALERT",
        link: "/volunteer",
      },
      {
        userId: donorUser.id,
        title: "Volunteer Dispatched",
        message: "Volunteer Karan Sharma is en route for Dal Makhani pickup. Keep PIN 7193 handy.",
        type: "STATUS_UPDATE",
        link: "/track/" + inTransitListing.id,
      },
      {
        userId: adminUser.id,
        title: "New Verification Alert",
        message: "Grand Royal Palace Banquets submitted 120 kg surplus for review (AI Score: 98%).",
        type: "EMERGENCY_ALERT",
        link: "/admin/verifications",
      },
    ],
  });

  // 7. Seed Audit Logs
  await prisma.auditLog.createMany({
    data: [
      {
        action: "LISTING_APPROVED",
        actorId: adminUser.id,
        actorName: adminUser.name,
        actorRole: "ADMIN",
        details: "Approved listing 'Paneer Butter Masala, Jeera Rice' (60 kg) after AI hygiene score verified.",
      },
      {
        action: "DISPATCH_MATCHED",
        actorId: volunteerUser.id,
        actorName: volunteerUser.name,
        actorRole: "VOLUNTEER",
        details: "Volunteer accepted route from Taveena Cloud Kitchen to Robin Hood Army.",
      },
    ],
  });

  // 8. Seed Contact Form Messages
  await prisma.message.createMany({
    data: [
      {
        name: "Chef Sanjeev Rathore",
        email: "sanjeev@radissonindore.com",
        subject: "Bulk surplus partnership for weekend banquets",
        message: "We have regular corporate buffets on Friday and Saturday nights with ~80-100 kg untouched food. Looking to onboard onto RescueBite.",
        isRead: false,
      },
      {
        name: "Ananya Mehta",
        email: "ananya@acropolis.edu",
        subject: "Campus Zero Waste Drive",
        message: "Our engineering student council at Acropolis Institute wants to organize a zero-food-waste drive with RescueBite volunteers.",
        isRead: true,
        reply: "Hello Ananya, we would love to support your campus drive! Our Indore volunteer coordinator will connect shortly.",
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

