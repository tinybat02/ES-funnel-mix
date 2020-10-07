import { Frame } from '../types';

export const processData = (data: Array<Frame>) => {
  let total = 0,
    sub01_10 = 0,
    sub10_30 = 0,
    sub30_60 = 0,
    sub60_90 = 0,
    sub90_180 = 0,
    revisit = 0;
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

    if (category.name == '30-60m') {
      sub30_60 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }

    if (category.name == '10-30m') {
      sub10_30 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }

    if (category.name == '01-10m') {
      sub01_10 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }

    if (category.name == 'docs') {
      //@ts-ignore
      revisit = category.fields[0].values.buffer[0].ratio.toFixed(2) / 100;
    }
  });

  const per = Math.round(sub60_90 * 10) / 10 + Math.round(sub90_180 * 10) / 10;
  const engaged = (per * total) / 100;

  return {
    csvData: [
      {
        Visitors: total,
        'Enagaged Customers': Math.round(engaged),
        '01-10m': (Math.round(sub01_10 * 10) / 10).toLocaleString(),
        '10-30m': (Math.round(sub10_30 * 10) / 10).toLocaleString(),
        '30-60m': (Math.round(sub30_60 * 10) / 10).toLocaleString(),
        '60-90m': (Math.round(sub60_90 * 10) / 10).toLocaleString(),
        '90-180m': (Math.round(sub90_180 * 10) / 10).toLocaleString(),
      },
    ],
    data: [
      { label: 'Visitors', quantity: total },
      { label: 'Engaged Customers', quantity: engaged },
      { label: 'Returning Customers', quantity: revisit * total },
    ],
  };
};
