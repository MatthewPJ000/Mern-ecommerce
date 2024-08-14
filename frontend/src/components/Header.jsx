import { selectFavoriteProduct } from "../redux/features/favorites/favoriteSlice";

import { useSelector } from "react-redux";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <>
      <div className="flex justify-around">
        <div className=" xl:block lg:hidden md:hidden:sm:hidden">
        <ProductCarousel />
        </div>
        <div className="flex flex-wrap">
            {favorites.map((product) => (
              <div key={product._id} className="boder shadow">
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
       
      </div>
    </>
  );
};

export default Header;
