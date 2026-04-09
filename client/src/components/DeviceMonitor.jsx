import { isMobile, browserName, osName, deviceType } from "react-device-detect";

const DeviceMonitor = () => {
  // Bonus: Manual check for high-accuracy modern hints (Chrome/Edge/Opera)
  const highResPlatform = navigator.userAgentData?.platform || "Unknown";
  return (
    <div className="support-card">
      <h3>System Information</h3>
      <ul>
        <li>
          <strong>Device Type:</strong>{" "}
          {deviceType || (isMobile ? "Mobile" : "Desktop")}
        </li>
        <li>
          <strong>OS:</strong> {osName} ({highResPlatform})
        </li>
        <li>
          <strong>Browser:</strong> {browserName}
        </li>
      </ul>
    </div>
  );
};

export default DeviceMonitor;
