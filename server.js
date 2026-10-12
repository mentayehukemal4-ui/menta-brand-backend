const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let systemData = {
    lottery: { title: "የመጀመሪያው ኦፊሴላዊ የዕጣ መርሃግብር", prize: "100,000 ብር", status: "ክፍት ነው" },
    bingo: { round: "ዙር 1", price: "50 ብር", status: "በመጀመር ላይ" },
    adverts: [
        { id: 1, text: "እንኳን ወደ Menta Brand ኦፊሴላዊ መተግበሪያ በደህና መጡ!", date: "2026-06-06" }
    ],
    members: []
};

app.get('/api/v1/data', (req, res) => {
    res.json({ success: true, data: systemData });
});

app.post('/api/v1/admin/update', (req, res) => {
    const { adminKey, type, payload } = req.body;

    if (adminKey !== "MENTA_SECURE_ADMIN_2026") {
        return res.status(403).json({ success: false, message: "የተሳሳተ የአድሚን ቁልፍ (Unauthorized)!" });
    }

    if (type === 'lottery') {
        systemData.lottery = payload;
    } else if (type === 'bingo') {
        systemData.bingo = payload;
    } else if (type === 'advert') {
        systemData.adverts.push({ id: Date.now(), ...payload, date: new Date().toISOString().split('T')[0] });
    }

    res.json({ success: true, message: "መረጃው በሰርቨር ተዘምኗል!", data: systemData });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Menta Brand Backend Server is running on port ${PORT}`);
});
