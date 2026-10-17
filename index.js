const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

// ========== KONFIGURASI ==========
const TOKEN = '8755167099:AAEGCmlr85msG4xWohT6OAb91o3Buinl4bY'; // <-- GANTI TOKEN DARI BOTFATHER
const PORT = process.env.PORT || 3000;

// ========== WEB SERVER (BUAT NAMPILIN GAME) ==========
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 Web server jalan di port ${PORT}`);
});

// ========== BOT TELEGRAM ==========
const bot = new TelegramBot(TOKEN, { polling: true });

// Kalo udah di-deploy ke Railway, isi URL-nya pake domain Railway lu
// Contoh: https://telegram-game-railway-production.up.railway.app
const WEB_URL = process.env.RAILWAY_PUBLIC_DOMAIN 
    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` 
    : `http://localhost:${PORT}`;

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const keyboard = {
        inline_keyboard: [
            [{ text: "💀 Doom 3D", web_app: { url: `${WEB_URL}/doom3d.html` } }],
            [{ text: "🐍 Snake", web_app: { url: `${WEB_URL}/snake.html` } }],
            [{ text: "🎯 Tic-Tac-Toe", web_app: { url: `${WEB_URL}/tictactoe.html` } }],
            [{ text: "🧠 Kuis", web_app: { url: `${WEB_URL}/quiz.html` } }]
        ]
    };

    bot.sendMessage(chatId, 
        `🎮 *TELEGRAM GAME HUB* 🎮\n\n` +
        `Pilih game di bawah. Game bakal kebuka langsung di dalam Telegram!`, 
        { parse_mode: 'Markdown', reply_markup: keyboard }
    );
});

console.log('💀 BOT TELEGRAM JALAN...');