import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        imageUrl: product.imageUrl as string,
      })
    );
  };

  return (
    <div className="h-full max-w-sm mt-8 overflow-hidden rounded-lg">
      <Link to={`/product/${product._id}`}>
        <div className="relative group">
          <img
            src={
              product.image ||
              "https://motto-spin.myshopify.com/cdn/shop/files/1_3d7043df-69aa-4cce-ac02-eb9d90301e66.jpg?v=1730455869&width=750"
            }
            alt={product.name}
            className="object-cover w-full transition rounded-xl h-96 group-hover:opacity-80"
          />

          <Badge className="absolute text-xs font-medium top-4 left-4">
            Badge
          </Badge>
        </div>
      </Link>

      <div className="flex items-end justify-between pt-4">
        <div>
          <h3 className="text-xl">{product.name}</h3>

          <p className="mt-2 text-gray-600">
            <span className="text-base">${product.price}</span>
          </p>
        </div>

        {/* <Button className="w-2/6">Add to Cart</Button> */}
      </div>
      <Button className="w-2/6 mt-2" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
