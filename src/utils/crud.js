/**
 * 抽象一个泛型，只是用于从数据中进行额外的操作 
 */
export const removeOne = model => async (req, res) => {

}
export const updateOne = model => async (req, res) => {

}
export const getMany = model => async (req, res) => {

}
export const getOne = model => async (req, res) => {

}
export const createOne = model => async (req, res) => {

}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})