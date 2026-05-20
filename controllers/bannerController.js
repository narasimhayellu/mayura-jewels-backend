const getBanner = async(req,res)=>{
    try {
        const banners = [
            {
              image:
                "https://i.ytimg.com/vi/3x6x9eXmj3U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDokbTFAVwb9lituX8sSZ4D2wOQwg",
            },
            {
              image:
                "https://www.londongold.com/media/uploads/Lab%20Grown%20Certs/Tennis-lab_banner.jpg",
            },
            {
              image:
                "https://images.bhimagold.com/admin/category/images/1778164361203-earrings-1200x600.jpg",
            },
          ];

        res.status(200).json({
          success: true,
          banners,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
          message: "Server Error",
        });
    }
}

module.exports = {getBanner};