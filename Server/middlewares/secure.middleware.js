import requestIp from "request-ip";

export const checkIpAccess = (req, res, next) => {
    const allowedIP = ["192.168.29.78", "192.168.56.1", "192.168.1.13", "192.168.1.1", "::1", "192.168.1.36", "::36"];
    const clientIP = requestIp.getClientIp(req); 
    console.log("Client IP:", clientIP);

    const normalizedIP = clientIP.startsWith("::ffff:") ? clientIP.substring(7) : clientIP;

    if (allowedIP.includes(normalizedIP)) {
        next();
    } else {
        res.status(403).send({
            success: false,
            message: "Invalid device cannot use the website on this device"
        });
    }
};