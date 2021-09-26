const { Todo } = require("../../models");

exports.addTodo = async (req, res) => {
  try {
    const { body } = req;

    const createData = await Todo.create({
      ...body,
      status: false,
    });
    const findAdded = await Todo.findOne({
      where: {
        id: createData.id,
      },
    });

    res.status(200).send({
      status: "Success",
      data: findAdded,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Server Error Cannot Create New Data",
    });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const allData = await Todo.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "Success",
      data: allData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server error cannot get all data",
    });
  }
};

exports.getDoneTodo = async (req, res) => {
  try {
    const allDone = await Todo.findAll({
      where: {
        status: true,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "Success",
      data: allDone,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error, Cannot get data",
    });
  }
};

exports.getUndoneTodo = async (req, res) => {
  try {
    const allUndone = await Todo.findAll({
      where: {
        status: false,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "Success",
      data: allUndone,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error, Cannot get data",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id, action } = req.params;

    let payload = req.body;

    if (action === "done") {
      payload = { status: true };
    }

    if (action === "undone") {
      payload = { status: false };
    }

    if (action === "body") {
      payload = { ...payload };
    }
    console.log(payload, action);

    const resultUpdated = await Todo.update(payload, { where: { id } });

    res.status(200).send({
      status: "Success",
      data: resultUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error, Cannot Update data",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: "Success",
      message: "Success delete data",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Error, cannot delete data",
    });
  }
};
