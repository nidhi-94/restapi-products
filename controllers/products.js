    import { product, testingProduct } from "../models/product.js";

    const buildQueryObject = (query) => {
        const queryObject = {};
        const { company, name, featured } = query;

        if (company) {
            queryObject.company = { $regex: company, $options: "i" };
        }

        if (name) {
            queryObject.name = { $regex: name, $options: "i" };
        }

        if (featured) {
            queryObject.featured = featured === "true";
        }

        return queryObject;
    };

    const fetchProducts = async (req, res, model) => {
        try {
            const queryObject = buildQueryObject(req.query);
            console.log("QueryObject:", queryObject);

            let apiData = model.find(queryObject);

            const { sort, select } = req.query;
            if (sort){
                const sortFix = sort.split(",").join(" ");
                apiData = apiData.sort(sortFix);
            }
            if (select) {
                const selectFix = select.split(",").join(" ");
                apiData = apiData.select(selectFix);
            }

            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            apiData = apiData.skip(skip).limit(limit);

            const total = await model.countDocuments(queryObject);
            const totalPages = Math.ceil(total / limit);

            if (page> totalPages) {
                return res.status(200).json({
                    message: "No more data",
                    page,
                    limit,
                    totalPages,
                    data: []
                });
            }
            
            const myData = await apiData;

            return res.status(200).json({data: myData });

        } catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };

    export const getAllProducts = (req, res) => fetchProducts(req, res, product);
    export const getAllProductsTesting = (req, res) => fetchProducts(req, res, testingProduct);
