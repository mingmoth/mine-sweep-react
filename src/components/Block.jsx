import React, { memo } from 'react';
import './Block.css';

function isBlockEqual(prevProps, nextProps) {
  return prevProps.block.revealed === nextProps.block.revealed
    && prevProps.block.flagged === nextProps.block.flagged;
}

const Block = memo(function Block({ block, disabled, onReveal, onFlag }) {
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
}, isBlockEqual);

export default Block;
