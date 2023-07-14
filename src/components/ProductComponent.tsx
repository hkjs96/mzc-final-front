import React from 'react';
import productList from '../data/productList';
import { Link } from 'react-router-dom';

function ProductComponent() {
  return (
    <ul className="prod-list v3">
      {productList.map((product, index) => {
        // const rawPrice = (product.originalPrice * (100 - product.salePoint)) / 100;
        // const discountedPrice = Math.floor(rawPrice / 100) * 100;

        return (
          <li key={index}>
            <div className="prod">
              <span className="flag-badge dc trans1">
                <span className="Pnum">{product.salePoint}%</span>
              </span>
              {/* 여기 주소 클릭시 해당 상품 정보를 넘겨서 주문 받는 페이지로 이동 */}
              <Link to={`/order/${product.productNo}`}>
                {/* <a className="thumb goodsList" href="#"> */}
                <div className="thumb goodsList">
                  <img
                    src={product.photoUrl}
                    alt={product.name}
                    className="pic-thumb"
                  />
                  <div className="prod-brand">
                    <strong className="exclusive"></strong>
                  </div>
                  <span className="prod-name double-line">{product.name}</span>
                  <div className="discount">
                    <span className="origin">
                      {product.originalPrice.toLocaleString()}
                      <span className="won">원</span>
                    </span>
                  </div>
                  <div className="price">
                    <strong className="total">
                      {product.discountedPrice.toLocaleString()}
                      <span className="won">원</span>
                    </strong>
                    <span className="oneday">오늘드림</span>
                  </div>
                  <div className="flags">
                    <span className="flag sale">세일</span>
                    <span className="flag coupon">쿠폰</span>
                  </div>
                  <div className="rating">
                    <span className="point">{product.star}</span>
                    <span className="num">{product.reviewPoint}</span>
                  </div>
                  {/* </a> */}
                </div>
              </Link>
            </div>
          </li>
        )
      })}
    </ul>
  );
}

export default ProductComponent;
