import React from 'react';
import teslaLogoImage from 'figma:asset/eecfb0a53fa095cec260f511765cfbf14c92dd2f.png';

interface TeslaLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function TeslaLogo({ className = "", width = 120, height = 24 }: TeslaLogoProps) {
  return (
    <img
      src={teslaLogoImage}
      alt="Tesla"
      width={width}
      height={height}
      className={className}
    />
  );
}