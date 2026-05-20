const getBanner = async(req,res)=>{
    try {
        const banners = [
            {
              image:
                "https://5.imimg.com/data5/SELLER/Default/2022/7/NY/YT/TP/1621291/jewellery-photography-500x500.jpg",
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