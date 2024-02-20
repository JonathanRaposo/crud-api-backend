import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<h3 
      style="text-align:
      center; color:purple;
      margin: 100px auto;
      font-size: 3em;

      ">API 🚀 </h3>`)
});

export default router;