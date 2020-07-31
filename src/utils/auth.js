import jwt from "jsonwebtoken"
import { User } from '../resources/user/user.model'
/**
 * 签发token
 * 
 * 根据config中jwt秘钥 + user ID + config中的过期时间
 * @param {*} user 
 */

export const newToken = user => {
  return jwt.sign(
    { id: user.id },
    config.secrets.jwt,
    {
      expiresIn: config.secrets.jwtExp
    }
  )
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })


export const signup = async (req, res) => {
  // 检查用户信息完备性
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      msg: 'need email and password'
    })
  }
  /**
   * - 默认创建一个用户
   * - 利用用户id生成token
   */
  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    // 201 状态码含义：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/201    
    return res.status(201).send({
      token
    })
  } catch (error) {
    console.log(`用户创建创建失败，原因${error}`)
    return res.status(500).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }
  const invalid = { msg: 'Invalid email and passoword combination' }
  // 在数据库中进行查找
  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password')
      .exec()
    if (!user) {
      // 401 状态码 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/401
      return res.status(401).send(invalid);
    }
    const match = await user.checkPassword(req.body.password)
    if (!match) {
      return res.status(401).send(invalid);
    }
    // 所有验证通过后再次签发token
    const token = newToken(user);
    return res.status(201).send({
      token
    })
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

/**
 * 用于检查当前用户是否是用户行为
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const protect = async (req, res, next) => {
  // 假设前端已经塞入header 中
  const bearer = req.headers.authorization
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }
  // 拿到登录token
  const token = bearer.split('Bearer ')[1].trim();
  let payload = undefined;
  try {
    payload = await verifyToken(token)
  } catch (error) {
    return res.status(401).end();
  }
  //TODO:  lean？
  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()
  if (!user) {
    return res.status(401).end()
  }
  req.user = user
  next();
}