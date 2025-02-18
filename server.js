//init
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Models
const Patient = require("./models/Patient");
const Registration = require("./models/Registration");
const VitalSigns = require("./models/VitalSigns");
const Doctor = require("./models/Doctor");
const DoctorAssessment = require("./models/DoctorAssessment");
const Laboratory = require("./models/Laboratory");
const LabTest = require("./models/LabTest");
const Medicine = require("./models/Medicine");
const MedicineRequest = require("./models/MedicineRequest");
const HealthProvider = require("./models/HealthProvider");
const Endorsement = require("./models/Endorsement");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/mobileClinicSystem", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes for Each Model

// Patient Routes
app.post("/patients", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /patients/:id - Retrieve a single patient by ID
app.get("/patients/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the URL
    const patient = await Patient.findById(id).populate("registration");
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Registration Routes
app.post("/registrations", async (req, res) => {
  try {
    const { patient: patientId } = req.body; // Extract the patient ID from the request body

    // Validate that the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(400).json({ error: "Patient not found" });
    }

    // Create and save the registration
    const registration = new Registration(req.body);
    await registration.save();

    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find().populate("patient");
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vital Signs Routes
app.post("/vital-signs", async (req, res) => {
  try {
    const { registration: registrationId } = req.body;

    // Validate registration exists
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(400).json({ error: "Registration not found" });
    }

    // Create and save vital signs
    const vitalSigns = new VitalSigns(req.body);
    await vitalSigns.save();
    res.status(201).json(vitalSigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/vital-signs", async (req, res) => {
  try {
    const vitalSigns = await VitalSigns.find().populate("registration");
    res.status(200).json(vitalSigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Doctor Routes
app.post("/doctors", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Doctor Assessment Routes
app.post("/doctor-assessments", async (req, res) => {
  try {
    const { registration: registrationId, doctor: doctorId } = req.body;

    // Validate registration exists
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(400).json({ error: "Registration not found" });
    }

    // Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(400).json({ error: "Doctor not found" });
    }

    // Create and save doctor assessment
    const assessment = new DoctorAssessment(req.body);
    await assessment.save();
    res.status(201).json(assessment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/doctor-assessments", async (req, res) => {
  try {
    const assessments = await DoctorAssessment.find()
      .populate("registration")
      .populate("doctor");
    res.status(200).json(assessments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Laboratory Routes
app.post("/laboratories", async (req, res) => {
  try {
    const lab = new Laboratory(req.body);
    await lab.save();
    res.status(201).json(lab);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/laboratories", async (req, res) => {
  try {
    const labs = await Laboratory.find();
    res.status(200).json(labs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lab Test Routes
app.post("/lab-tests", async (req, res) => {
  try {
    const { lab: labId, registration: registrationId, testTypes } = req.body;

    // Validate lab exists
    const lab = await Laboratory.findById(labId);
    if (!lab) {
      return res.status(400).json({ error: "Laboratory not found" });
    }

    // Validate registration exists
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(400).json({ error: "Registration not found" });
    }

    // Validate testTypes is an array and not empty
    if (!Array.isArray(testTypes) || testTypes.length === 0) {
      return res
        .status(400)
        .json({ error: "testTypes must be a non-empty array" });
    }

    // Create and save lab test
    const labTest = new LabTest({
      lab: labId,
      registration: registrationId,
      testTypes,
    });
    await labTest.save();

    res.status(201).json(labTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/lab-tests", async (req, res) => {
  try {
    const labTests = await LabTest.find()
      .populate("lab")
      .populate("registration");
    res.status(200).json(labTests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Medicine Routes
app.post("/medicines", async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/medicines", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Medicine Request Routes
app.post("/medicine-requests", async (req, res) => {
  try {
    const { registration: registrationId, medicine: medicineId } = req.body;

    // Validate registration exists
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(400).json({ error: "Registration not found" });
    }

    // Validate medicine exists
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(400).json({ error: "Medicine not found" });
    }

    // Create and save medicine request
    const request = new MedicineRequest(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/medicine-requests", async (req, res) => {
  try {
    const requests = await MedicineRequest.find()
      .populate("registration")
      .populate("medicine");
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health Provider Routes
app.post("/health-providers", async (req, res) => {
  try {
    const provider = new HealthProvider(req.body);
    await provider.save();
    res.status(201).json(provider);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/health-providers", async (req, res) => {
  try {
    const providers = await HealthProvider.find();
    res.status(200).json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endorsement Routes
app.post("/endorsements", async (req, res) => {
  try {
    const { registration: registrationId, provider: providerId } = req.body;

    // Validate registration exists
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(400).json({ error: "Registration not found" });
    }

    // Validate health provider exists
    const provider = await HealthProvider.findById(providerId);
    if (!provider) {
      return res.status(400).json({ error: "Health provider not found" });
    }

    // Create and save endorsement
    const endorsement = new Endorsement(req.body);
    await endorsement.save();
    res.status(201).json(endorsement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/endorsements", async (req, res) => {
  try {
    const endorsements = await Endorsement.find()
      .populate("registration")
      .populate("provider");
    res.status(200).json(endorsements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
