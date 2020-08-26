module.exports = async (req, res) => {
    // Just basic OK status.
    res.json({
        success: "ok",
        description: "API server is up"
        platformStatus: "https://www.vercel-status.com/"});
}