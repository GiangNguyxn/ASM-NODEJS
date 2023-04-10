import product from "../models/product";
import { productValidate } from "../Schemas/product";
import Category from "../models/category";
import cloudinary from "../config/cloudinary";
export const getAll = async (req, res) => {
  const {
    _limit = 10,
    _sort = "createAt",
    _order = "asc",
    _page = 1,
  } = req.query;
  const option = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order == "desc" ? -1 : 1,
    },
  };

  try {
    const data = await product.paginate({}, option);
    data.length === 0
      ? res.json({ message: "Không có sản phẩm", data: [] })
      : res.json({ data: data });
  } catch (error) {}
};
export const getOne = async (req, res) => {
  try {
    const data = await product.findOne({ _id: req.params.id }).populate({
      path: "categoryId",
      select: "-__v",
    });
    data.length === 0
      ? res.json({ message: "Không có sản phẩm" })
      : res.json(data);
  } catch (error) {
    return res.json({ message: error });
  }
};

export const creata = async (req, res) => {
  try {
    const { name, price, des, image } = req.body;
    const { error } = productValidate.validate(req.body);
    error ? res.json({ message: error.details[0].message }) : true;
    // console.log();
    // if (!image) {
    //   return res.json({ message: "Chưa có ảnh để upload" });
    // }
    // const uploadRes = await cloudinary.uploader.upload(image, {
    //   upload_preset: "demo-upload",
    // });
    // if (!uploadRes) {
    //   return res.json({ message: "Upload ảnh thất bại" });
    // }

    const data = await product.create(req.body);
    await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: { products: data._id },
    });
    data.length === 0
      ? res.json({ message: "Thêm sản phẩm thất bại" })
      : res.json({ message: "Thêm sản phẩm thành công", data });
  } catch (error) {
    return res.json({ message: error });
  }
};
export const remove = async (req, res) => {
  try {
    const data = await product.findByIdAndDelete({ _id: req.params.id });
    return res.json({ message: "Xóa sản phẩm thành công", data });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = productValidate.validate(req.body);
    if (error) {
      return res.json({
        messages: error.details.map((err) => err.message),
      });
    }

    const data = await product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    !data
      ? res.json({ message: "Cập nhật sản phẩm không thành công" })
      : res.json({ message: "Cập nhật sản phẩm thành công", data });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
