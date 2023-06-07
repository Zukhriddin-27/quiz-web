import axios from 'axios'

// Function to send data to Telegram bot
const sendDataToTelegramBot = async (data) => {
  const apiUrl = `https://api.telegram.org/bot${process.env.REACT_APP_YOUR_BOT_TOKEN}/sendMessage`
  try {
    await axios.post(apiUrl, {
      chat_id: process.env.REACT_APP_TELEGRAM_CHAT_ID,
      text: data,
    })
    console.log('Message sent to Telegram bot!')
  } catch (error) {
    console.error('Error sending message to Telegram bot:', error)
  }
}
export default sendDataToTelegramBot
// sendDataToTelegramBot()

// const getChatId = async () => {
//   const telegramBotToken = '6191415739:AAFvJy0BBQ34JhsGXUHoiKMcfWQfTDi4WqQ'

//   const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/getUpdates`

//   try {
//     const response = await axios.get(apiUrl)
//     const chatId = response.data.result[0].message.chat.id
//     console.log('Chat ID:', chatId)
//   } catch (error) {
//     console.error('Error retrieving chat ID:', error)
//   }
// }

// getChatId()
