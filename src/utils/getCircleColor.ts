/*
  @param availabilityStatus: string
  @return string (className for color circle)
*/

export const getCircleColor = (availabilityStatus: string) => {
  switch (availabilityStatus) {
    case 'In Stock':
      return 'bg-green';
    case 'Low Stock':
      return 'bg-yellow';
    case 'Out of Stock':
      return 'bg-red';
  }
};
