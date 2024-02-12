import User from "../models/user.js";
import Utils from "../utils/utils.js";
import bcrypt from "bcrypt"
import ApiErrors from "../handlers/api-errors.js";
class UserController {
    async registerUser(req, res, next) {
        const {name, email, password, lastLogin, regTime, status} = req.body
        if ((await Utils.doesDocumentExist(User, {email}))) {
            return next(ApiErrors.badRequest("This email address is already in use."))
        }
        if ((await Utils.doesDocumentExist(User, {name}))) {
            return next(ApiErrors.badRequest("This name is already in use."))
        }
        if (!email || !password) {
            return next(ApiErrors.badRequest('Incorrect email or password.'))
        }
        const hashPassword = await bcrypt.hash(password, 3)
        try {
            await User.create({name, email, password: hashPassword, lastLogin, regTime, status})
            const token = Utils.generateJWT(email)
            return res.json({email, token})
        } catch (e) {
            return next(ApiErrors.internal('Server Error ' + e))
        }
    }
    async loginUser(req, res, next) {
        const {email, password} = req.body

        if (!(await Utils.doesDocumentExist(User, {email}))) {
            return next(ApiErrors.badRequest('Incorrect email or password.'))
        }
        const user = await User.findOne({email})
        if(!user.status) return next(ApiErrors.badRequest('user is blocked'))
        if (!(await bcrypt.compare(password, user.password))) {
            return next(ApiErrors.badRequest('Incorrect email or password.'))
        }
        const token = Utils.generateJWT(user.email)
        return res.json({email, token})
    }
    async getAllUsers(req, res, next) {
        const userList = await User.find({})
        return res.json(userList)
    }
    async updateUsers(req, res, next) {
        const userList = req.body;
        try {
            for (const userData of userList) {
                const { id, status } = userData;
                await User.findOneAndUpdate({ _id: id }, { $set: { status } });
            }
            res.status(200).send();
        }
        catch (e) {
            return next(ApiErrors.internal("Save Error, operation can't be performed"))
        }
    }

    async deleteUser(req, res, next) {
        const { id } = req.params;
        try {
            await User.deleteOne({_id: id})
            res.status(204).send();
        }
        catch (e) {
            return next(ApiErrors.badRequest("Cant delete the item, something went wrong"))
        }
    }


}
export default new UserController();