"use client";
import { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, PointElement,LinearScale, LineElement, CategoryScale } from "chart.js";
ChartJS.register(LinearScale, PointElement, LineElement, CategoryScale);
import { Line } from 'react-chartjs-2';
import PatientInfo from "@/components/custom/pateintInfo";
import AutoBreadcrumb from "@/components/custom/breadCrumb";
import { connectToSocket, unsubscribeFromRoom }from '@/lib/socket';
import useStack from './useStack';
import linechartFormatter from '@/lib/linechartformatter';
import { PatientInfoType } from '@/types/pateintinfo';
import { useQuery } from '@tanstack/react-query';
import { fetchPatientlog } from './query';
import { useRouter } from 'next/navigation';
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
      annotation: {
        annotations: {
          limit: {
            type: 'line',
            borderColor: 'red',
            borderWidth: 2,
            value: 50, // Set the value where you want the limit bar
            label: {
              content: 'Limit',
              enabled: true,
              position: 'start',
            },
          },
        },
      },
    },
  };

export default function PatientSync({ params:{patientid} }: { params: { patientid: string } }){
      const router = useRouter();
      const {messages, pushMessage, setMessages} = useStack();
      const { data, isLoading, refetch, error } = useQuery({queryKey:[patientid], queryFn:fetchPatientlog});
      const mysocket = useRef<(() => void) | null>(null);
      useEffect(() => {
        if(data){
          setMessages(data);
        }
        const connectRealtime = ()=>{
          const socket = connectToSocket(`patient/${patientid}`, pushMessage);
          return () => {
            unsubscribeFromRoom(`patient/${patientid}`);
          };
        }
        mysocket.current = connectRealtime();
      }, [patientid, data]);

    useEffect(()=>{
      if(error){
        router.back();
      }
    }, [error, router]);

    if(isLoading){
      return <section className="w-100">
          <div className="container">
                    <AutoBreadcrumb></AutoBreadcrumb>
                    <PatientInfo patientid={patientid}></PatientInfo>
          </div>
      </section>;
    }

    return <section className="w-100">
        <div className="container">
                  <AutoBreadcrumb></AutoBreadcrumb>
                  <PatientInfo patientid={patientid}></PatientInfo>
                  <div className='m-0'>
                    <h3 className='text-xl'>
                        Heart Rate
                    </h3>
                    <div className="align-center w-100">
                        <Line
                            data={linechartFormatter(PatientInfoType.bpm,messages)}
                            className="m-auto h-80"
                        />
                    </div>
                  </div>
                  <div>
                    <h3 className='text-xl'>
                        BP
                    </h3>
                    <div className="align-center w-100">
                        <Line
                            options={options}
                            data={linechartFormatter(PatientInfoType.bp,messages)}
                            className="m-auto h-80"
                        />
                    </div>
                  </div>
            </div>
    </section>;
}