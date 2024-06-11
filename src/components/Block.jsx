import React from 'react';
import './Block.css';

function Block({ block, disabled, onReveal, onFlag }) {

  const blockDisplay = () => {
    if (block.flagged) return 'F';
    if (block.revealed) {
      return block.mines ? '@' : block.adjacent || ''
    };
    return '';
  };

  const handleClick = () => {
    if (block.revealed || block.flagged) return
    onReveal(block.x, block.y);
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    if (block.revealed) return
    onFlag(block.x, block.y);
  };

  return (
    <div
      className={[
        'block',
        disabled && 'block-disabled',
        block.revealed ? 'block-revealed' : 'block-hidden',
        block.mines && block.revealed && 'block-mine',
      ].filter(Boolean).join(' ')}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {blockDisplay()}
    </div>
  );
}

export default React.memo(Block);
