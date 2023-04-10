import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: Number,
    des: String,
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    // image: {
    //   type: Object,
    //   require: false,
    // },
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
