import React, { useState } from 'react';
import { CardTitle, Chip, MicroLabel, NeonCard } from '../kit';
import { ClIcon } from '../ConsultationIcons';

function ReadingCard({ reading, label, chips, art, onClose, children }) {
  const [failed, setFailed] = useState(false);

  return (
    <NeonCard
      as="details"
      id={reading.id}
      className="cl-reading b-reading-card"
      data-cl-reading={reading.key}
      accent="cyan"
    >
      <summary className="b-reading-card__summary">
        <span className="b-reading-card__topline">
          <span className="b-reading-card__number">{reading.number}</span>
          <MicroLabel>{label}</MicroLabel>
          <span className="b-reading-card__arrow" aria-hidden="true"><ClIcon name="arrow" /></span>
        </span>
        <span className="b-reading-card__image" aria-hidden="true">
          {art && !failed && (
            <picture>
              <source type="image/avif" srcSet={art.avif} />
              <img
                src={art.webp}
                width={art.width}
                height={art.height}
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => setFailed(true)}
              />
            </picture>
          )}
        </span>
        <CardTitle as="span" className="b-reading-card__title">{reading.title}</CardTitle>
        <span className="b-reading-card__question">{reading.question}</span>
        <span className="b-reading-card__chips" aria-label={`${reading.title} topics`}>
          {chips.map((chip) => <Chip key={chip}>{chip}</Chip>)}
        </span>
      </summary>
      <div className="b-reading-card__body">
        <p>{reading.text}</p>
        {children}
        <button type="button" className="cl-text-button" onClick={onClose}>
          Close this topic <ClIcon name="close" />
        </button>
      </div>
    </NeonCard>
  );
}

export default ReadingCard;
