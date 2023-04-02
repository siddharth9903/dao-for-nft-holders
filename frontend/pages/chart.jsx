import React, { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';

const CandlestickChart = () => {
  const chartContainerRef = useRef();
  const chartInstanceRef = useRef();

  useEffect(() => {
    chartInstanceRef.current = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      layout: {
        backgroundColor: '#f5f5f5',
        textColor: '#333'
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)'
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)'
        }
      },
      crosshair: {
        mode: 'normal'
      },
      priceScale: {
        borderVisible: true,
        borderColor: '#555ffd',
        scaleMargins: {
          top: 0.2,
          bottom: 0.2
        },
      },
      timeScale: {
        borderVisible: true,
        borderColor: '#555ffd',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chartInstanceRef.current.addCandlestickSeries({
      upColor: '#6BA583',
      downColor: '#FF0000',
      borderUpColor: '#6BA583',
      borderDownColor: '#FF0000',
      wickUpColor: '#6BA583',
      wickDownColor: '#FF0000',
    });

    // Generate random data
    const numDataPoints = 50;
    const data = Array.from({ length: numDataPoints }, () => ({
      time: Math.floor(Math.random() * 1000000),
      open: Math.random() * 100,
      high: Math.random() * 110,
      low: Math.random() * 90,
      close: Math.random() * 100,
    }));
    data=data.sort((a, b) => a.time - b.time); 
    candlestickSeries.setData(data);
  }, []);

  return <div ref={chartContainerRef}></div>;
};

export default CandlestickChart;