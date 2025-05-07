import React from 'react';

import Loader from '.';

import useTheme from '../../Hook/Utility/useTheme';

export default function LoadingViewWrapper({
  color,
  loading,
  children,
}: {
  children: React.ReactNode;
  loading: boolean;
  color?: string;
}) {
  const Theme = useTheme();

  if (loading) {
    return <Loader color={color ?? Theme.colors.dark} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
