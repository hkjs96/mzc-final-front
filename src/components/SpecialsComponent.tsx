import React, { useEffect } from 'react';
import TimeComponent from './TimeComponent';
import ProductComponent from './ProductComponent';


function SpecialsComponent() {

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://static.oliveyoung.co.kr/pc-static-root/css/style.css?dumm=20230706003';
    link.rel = 'stylesheet';
    link.media = ''; // Set your desired media attribute value here

    document.head.appendChild(link);

    return () => {
      // Cleanup: Remove the dynamically added link element when the component unmounts
      document.head.removeChild(link);
    };
  }, []);


  return (
    <div id="Container">
      <div className="spVisualTit">
        <div>
          <h1>
            오늘의 특가
            <span>딱 하루만! 오늘의 특가 찬스</span>
          </h1>
        </div>
      </div>

      <div className="today_specials_inner">
        <div className="spTodayWrap">
          <div className="spTodayTit">
            <h2 className="titMove">
              <span>스</span>
              <span>페</span>
              <span>셜</span> <span>오</span>
              <span>특</span>
            </h2>
            <TimeComponent />
          </div>
          <ProductComponent />
        </div>
      </div>
    </div>
  );
}

export default SpecialsComponent;
