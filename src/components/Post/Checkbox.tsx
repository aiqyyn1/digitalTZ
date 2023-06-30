import React, { useContext } from 'react';
import { PostContext } from './Context';
import Delete from './Delete';
import Favorites from './Favorites';

type CheckBoxProps = {
  Id: number;
  isChecked: boolean;
};

const Checkbox = ({ Id, isChecked }: CheckBoxProps) => {
  const { selectedPostIds, setSelectedPostIds } = useContext(PostContext);
  const onChecked = (postId: number, checked: boolean) => {
    if (checked) {
      const post = [...selectedPostIds, postId];
      setSelectedPostIds(post);
    } else {
      const post = selectedPostIds.filter((id) => id !== postId);
      setSelectedPostIds(post);
    }
  };
  const handleChange = () => {
    onChecked(Id, !isChecked);
  };

  return (
    <div>
      <input type='checkbox' checked={isChecked} onChange={handleChange} />
      <label>CheckBox</label>
    </div>
  );
};

export default Checkbox;
