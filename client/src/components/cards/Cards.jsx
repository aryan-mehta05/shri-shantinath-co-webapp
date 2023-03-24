import React from "react";
import { cardsData } from "../../data/Data";
import "./Cards.css";

export default function cards() {
  return (
    <div className="cards-container">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="card"
          style={{
            background: card.color.backGround,
            boxShadow: card.color.boxShadow,
          }}
        >
          <div className="card-title">
            {card.title}
            <div className="card-icon">
              <card.png />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
