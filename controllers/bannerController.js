const getBanner = async(req,res)=>{
    try {
        const banners = [
            {
              image:
                "https://t3.ftcdn.net/jpg/06/59/71/56/360_F_659715679_IxWNq7PbEXkkI2LeQFigH1AvFEX9PBpn.jpg",
            },
            {
              image:
                "https://www.londongold.com/media/uploads/Lab%20Grown%20Certs/Tennis-lab_banner.jpg",
            },
            {
              image:
                "https://wallpapers.com/images/hd/jewellery-background-1920-x-1200-v2f7plnck08zqeh8.jpg",
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