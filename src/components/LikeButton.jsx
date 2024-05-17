import React, { useState } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

function LikeButton({ initialLiked, onLikeChange }) {
    const [liked, setLiked] = useState(initialLiked);

    const handleClick = () => {
        const newLikedState = !liked;
        setLiked(newLikedState);
        onLikeChange(newLikedState);
    };

    return liked ? (
        <AiFillLike color="blue" size="24" onClick={handleClick} />
    ) : (
        <AiFillDislike color="red" size="24" onClick={handleClick} />
    );
}

export default LikeButton;
