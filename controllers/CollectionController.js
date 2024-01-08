import CollectionModel from "../models/Collection.js";

export const createCollection = async (req, res) => {
  try {
    const doc = new CollectionModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const collection = await doc.save();

    res.json(collection);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Collection creating failed",
    });
  }
};

export const getAllCollections = async (req, res) => {
  try {
    // .populate("user").exec() - для того чтобы в поле user был весь объект юзера, а не просто id
    const collections = await CollectionModel.find().populate("user").exec();
    res.json(collections);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Getting collections failed",
    });
  }
};

export const getOneCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;
    // Для получения и обновления кол-ва просмотров стати
    const doc = await CollectionModel.findOneAndUpdate(
      { _id: collectionId },
      { $inc: { viewsCount: 1 } }, // прибавляем +1 к просмотрам
      { new: true }
    ).exec();

    if (!doc) {
      return res.status(404).json({ message: "Statya not found" });
    }
    res.json(doc);

    // Для только получения статьи
    // const article = await CollectionModel.findById(collectionId);
    // if (!article) {
    //   return res.status(404).json({ message: "Statya not found" });
    // }
    // res.json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Getting collection failed",
    });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;
    const article = await CollectionModel.findByIdAndDelete(collectionId);

    if (!article) {
      return res.status(404).json({ message: "Statya not found" });
    }

    res.json({ message: "Statya was deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Deleting collection failed",
    });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;
    await CollectionModel.updateOne(
      {
        _id: collectionId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({
      message: "Statya was updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Updating collection failed",
    });
  }
};
