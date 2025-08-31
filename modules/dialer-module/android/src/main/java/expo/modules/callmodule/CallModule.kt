package expo.modules.callmodule

import android.content.pm.PackageManager
import android.provider.CallLog
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

class CallModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("CallModule")

    // ✅ Ask for READ_CALL_LOG permission
    AsyncFunction("requestCallLogPermission") { promise: Promise ->
      val context = appContext.reactContext ?: return@AsyncFunction promise.reject(
        "NO_CONTEXT",
        "No React context available", null
      )
      val activity = appContext.currentActivity

      if (activity == null) {
        promise.reject("NO_ACTIVITY", "No activity available to request permission", null)
        return@AsyncFunction
      }

      val permission = android.Manifest.permission.READ_CALL_LOG

      if (ContextCompat.checkSelfPermission(context, permission) == PackageManager.PERMISSION_GRANTED) {
        promise.resolve(true) // already granted
      } else {
        ActivityCompat.requestPermissions(activity, arrayOf(permission), 321)
        promise.resolve(false) // asked, but not yet granted
      }
    }

    // ✅ Fetch call logs
    AsyncFunction("getCallLogs") { promise: Promise ->
      val context = appContext.reactContext ?: return@AsyncFunction promise.reject(
        "NO_CONTEXT",
        "No React context available",
        null
      )

      val permission = android.Manifest.permission.READ_CALL_LOG
      if (ContextCompat.checkSelfPermission(context, permission) != PackageManager.PERMISSION_GRANTED) {
        promise.reject("PERMISSION_DENIED", "Call log permission not granted", null)
        return@AsyncFunction
      }

      val callLogs = mutableListOf<Map<String, Any?>>()

      val cursor = context.contentResolver.query(
        CallLog.Calls.CONTENT_URI,
        arrayOf(
          CallLog.Calls.NUMBER,
          CallLog.Calls.CACHED_NAME,
          CallLog.Calls.TYPE,
          CallLog.Calls.DATE,
          CallLog.Calls.DURATION
        ),
        null,
        null,
        "${CallLog.Calls.DATE} DESC"
      )

      cursor?.use {
        val numberIndex = it.getColumnIndex(CallLog.Calls.NUMBER)
        val nameIndex = it.getColumnIndex(CallLog.Calls.CACHED_NAME)
        val typeIndex = it.getColumnIndex(CallLog.Calls.TYPE)
        val dateIndex = it.getColumnIndex(CallLog.Calls.DATE)
        val durationIndex = it.getColumnIndex(CallLog.Calls.DURATION)

        while (it.moveToNext()) {
          val number = it.getString(numberIndex) ?: "Unknown"
          val type = when (it.getInt(typeIndex)) {
            CallLog.Calls.INCOMING_TYPE -> "INCOMING"
            CallLog.Calls.OUTGOING_TYPE -> "OUTGOING"
            CallLog.Calls.MISSED_TYPE -> "MISSED"
            CallLog.Calls.REJECTED_TYPE -> "REJECTED"
            else -> "UNKNOWN"
          }
          val date = it.getLong(dateIndex)
          val duration = it.getLong(durationIndex)
          val name = it.getString(nameIndex) ?: "Unknown"

          callLogs.add(
            mapOf(
              "number" to number,
              "name" to name,
              "type" to type,
              "date" to date,
              "duration" to duration
            )
          )
        }
      }

      promise.resolve(callLogs)
    }
  }
}
