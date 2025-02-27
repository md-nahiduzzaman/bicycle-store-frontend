import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { TProduct } from "@/types";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.quantity,
        imageUrl: product.img || "",
      })
    );
  };

  return (
    <div className="h-full max-w-sm p-4 border border-gray-300 rounded-lg">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative group">
          <img
            src={
              product.img ||
              "https://motto-spin.myshopify.com/cdn/shop/files/1_3d7043df-69aa-4cce-ac02-eb9d90301e66.jpg?v=1730455869&width=750"
            }
            alt={product.name}
            className="object-cover object-center w-full transition rounded-xl h-80 group-hover:opacity-80"
          />
          <Badge className="absolute text-xs font-medium top-4 left-4">
            New
          </Badge>
        </div>
      </Link>

      {/* Name & Price Row */}
      <div className="flex items-center justify-between pt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-base font-medium text-gray-700">${product.price}</p>
      </div>

      {/* Buttons Row */}
      <div className="flex items-center gap-2 mt-4">
        <Link to={`/product/${product._id}`} className="w-1/2">
          <Button variant="outline" className="w-full">
            View Item
          </Button>
        </Link>
        <Button className="w-1/2" onClick={handleAddToCart}>
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
