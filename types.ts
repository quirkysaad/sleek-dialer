export type CallTypes = 'INCOMING' | 'OUTGOING' | 'MISSED' | 'REJECTED' | 'UNKNOWN';

export type CallLog = {
    date: number;
    duration: number; // in seconds
    name?: string;
    number: string;
    type: CallTypes;
}

export type CallSection = {
  title: string;  
  data: CallLog[];
}