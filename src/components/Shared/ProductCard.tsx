import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ProductCard = () => {
  return (
    <div className="h-full max-w-sm mt-8 overflow-hidden rounded-lg">
      <div className="relative group">
        <img
          src="https://motto-spin.myshopify.com/cdn/shop/files/1_3d7043df-69aa-4cce-ac02-eb9d90301e66.jpg?v=1730455869&width=750"
          alt="Bike Cable Protector"
          className="object-cover w-full transition rounded-xl h-96 group-hover:opacity-80"
        />
        <img
          src="https://motto-spin.myshopify.com/cdn/shop/files/Hover1_cad9495c-6264-44b2-b62c-0fa2b2ac5171.jpg?v=1730455872&width=750"
          alt="Bike Cable Protector Hover"
          className="absolute inset-0 object-cover w-full h-full transition opacity-0 rounded-xl group-hover:opacity-100"
        />
        <Badge className="absolute text-xs font-medium top-4 left-4">
          Badge
        </Badge>
      </div>

      <div className="flex items-end justify-between pt-4">
        <div>
          <h3 className="text-xl">Bike Cable Protector</h3>

          <p className="mt-2 text-gray-600">
            <span className="text-base">$49.00</span>
          </p>
        </div>

        {/* <Button className="w-2/6">Add to Cart</Button> */}
      </div>
      <Button className="w-2/6 mt-2">Add to Cart</Button>
    </div>
  );
};

export default ProductCard;
