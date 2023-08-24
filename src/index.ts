import app from './app'

const port = process.env.PORV || 3000

app.listen(port, () => console.log(`app running on port ${port}`))
