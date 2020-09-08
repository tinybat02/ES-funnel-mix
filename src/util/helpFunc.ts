import { Frame } from '../types';

export const processData = (data: Array<Frame>) => {
  let total = 0,
    sub60_90 = 0,
    sub90_180 = 0;
  data.map(category => {
    if (category.name == 'Sum count')
      category.fields[0].values.buffer.map(item => {
        if (item) total += item;
      });

    if (category.name == '90-180m') {
      sub90_180 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }

    if (category.name == '60-90m') {
      sub60_90 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }
  });
  const per = Math.round(sub60_90 * 10) / 10 + Math.round(sub90_180 * 10) / 10;
  const engaged = (per * total) / 100;

  return [
    { label: 'Visitors', quantity: total },
    { label: 'Engaged Customers', quantity: engaged },
    { label: 'Returning Customers', quantity: 0 },
  ];
};
