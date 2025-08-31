import { NativeModule, requireNativeModule } from 'expo';

declare class CallModule extends NativeModule {
  requestCallLogPermission(): Promise<boolean>;
  getCallLogsAsync(): Promise<any>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<CallModule>('CallModule');
