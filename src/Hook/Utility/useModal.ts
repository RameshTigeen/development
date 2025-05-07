import React from 'react';

export default function useModal() {
  const [visible, setVisible] = React.useState(false);

  const ShowModal = () => {
    setVisible(true);
  };

  const HideModal = () => {
    setVisible(false);
  };

  return {visible, ShowModal, HideModal};
}
