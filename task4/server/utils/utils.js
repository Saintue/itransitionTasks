import jwt from "jsonwebtoken";

class Utils {

    async doesDocumentExist(model, query) {
        return query
            ? await model.findOne(query).then((result) => !!result)
            : false
    }

    generateJWT = (email) => {
        return jwt.sign({
                email,
            },
            `${process.env.JWT_KEY}`,
            {expiresIn: '12h'})
    }
}

export default new Utils()