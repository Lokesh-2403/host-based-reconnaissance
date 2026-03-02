import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  status: "Planned" | "Underway" | "Completed";
  githubLink?: string;
}

interface ProjectsProps {
  onViewHostProject: () => void;
  onViewWindowsProject: () => void;
}

export default function Projects({
  onViewHostProject,
  onViewWindowsProject,
}: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const projects: Project[] = [
    {
      title: "Host-Based Network Reconnaissance & Service Enumeration",
      status: "Completed",
      description: "A practical host-based reconnaissance lab where Nmap is used to discover live hosts, identify open ports, enumerate running services, and perform OS fingerprinting.",
      tags: ["Kali Linux", "Nmap", "TCP SYN Scan", "Service Enumeration", "OS Detection"],
      githubLink: "https://github.com/Lokesh-2403/host-based-reconnaissance",
    },
    {
      title: "Windows Security Event Log Analysis & Threat Detection",
      status: "Completed",
      description: "Investigated 881 security events across 5 critical Event IDs on a Windows lab machine, identifying suspicious login patterns and potential insider threats.",
      tags: ["Windows Event Viewer", "Log Analysis", "Threat Detection", "SOC Operations"],
      githubLink: "https://github.com/Lokesh-2403/windows-login",
    },
    {
      title: "Linux SSH Brute Force Detection System",
      status: "Completed",
      description: "Detect and analyze SSH brute-force attempts on a Linux server using log parsing, pattern recognition, and automated alerting scripts.",
      tags: ["Kali Linux", "Bash", "Python", "Regex"],
      githubLink: "https://github.com/Lokesh-2403/ssh-brute-force",
    },
    {
      title: "Endpoint Security Monitoring",
      status: "Underway",
      description: "Implement endpoint monitoring and threat detection mechanisms to identify suspicious processes and privilege escalation attempts.",
      tags: ["Kali Linux", "Wazuh / OSSEC", "Auditd", "Syslog", "Process Monitoring"],
    },
    {
      title: "Web Application Penetration Testing Lab",
      status: "Planned",
      description: "Set up a vulnerable web application environment to practice common web attack techniques like SQL injection, XSS, and CSRF, using tools like Burp Suite and OWASP ZAP.",
      tags: ["Burp Suite", "OWASP ZAP", "SQLmap", "Nikto", "Metasploit Framework"],
    },
    {
      title: "SIEM Deployment & Real-Time Threat Hunting Dashboard Implementation",
      status: "Planned",
      description: "Deployed a SIEM solution and implemented a real-time threat hunting dashboard to monitor and analyze security events across multiple systems.",
      tags: ["Kali Linux", "Windows VM", "Splunk / ELK Stack", "Threat Hunting", "Winlogbeat", "Filebeat"],
    },
    {
      title: "Active Directory Attack Simulation & Defensive Monitoring Lab",
      status: "Planned",
      description: "Simulated Active Directory attacks in a controlled lab environment and implemented defensive monitoring mechanisms to detect and respond to suspicious activities.",
      tags: ["BloodHound", "Kali Linux", "Windows VM", "Mimikatz", "Impacket", "Responder", "Defensive Monitoring"],
    },
    {
      title: "Cloud Infrastructure Security Assessment & Misconfiguration Detection",
      status: "Planned",
      description: "Assessed cloud infrastructure for security misconfigurations and vulnerabilities in AWS and Azure environments.",
      tags: ["ScoutSuite", "Prowler", "AWS CLI", "AWS Free Tier Account"],
    },
    {
      title: "Static & Dynamic Malware Analysis and Reverse Engineering Lab",
      status: "Planned",
      description: "Performed static and dynamic analysis of malware samples and reverse-engineered binaries to understand their behavior and functionality.",
      tags: ["Kali Linux", "Wireshark", "Ghidra", "Radare2", "Volatility", "VirtualBox"],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableHeight = section.offsetHeight - windowHeight;
      if (scrollableHeight <= 0) return;
      const raw = -rect.top / scrollableHeight;
      const clamped = Math.min(Math.max(raw, 0), 1);
      setProgress(clamped);
      const step = 1 / (projects.length - 1);
      const idx = Math.min(Math.round(clamped / step), projects.length - 1);
      setActiveIndex(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [projects.length]);

  const translateX = -progress * 512 * (projects.length - 1);

  const getStatusStyle = (status: Project["status"]) => {
    if (status === "Completed") {
      return {
        backgroundColor: "rgba(16,185,129,0.12)",
        color: "#6ee7b7",
        border: "1px solid rgba(16,185,129,0.3)",
      };
    }
    if (status === "Underway") {
      return {
        backgroundColor: "rgba(59,130,246,0.12)",
        color: "#93c5fd",
        border: "1px solid rgba(59,130,246,0.3)",
      };
    }
    return {
      backgroundColor: "rgba(234,179,8,0.12)",
      color: "#fde68a",
      border: "1px solid rgba(234,179,8,0.3)",
    };
  };

  const getActiveGlow = (status: Project["status"]) => {
    if (status === "Completed")
      return "0 0 60px rgba(16,185,129,0.15), 0 0 120px rgba(6,182,212,0.1), 0 20px 60px rgba(0,0,0,0.6)";
    if (status === "Underway")
      return "0 0 60px rgba(59,130,246,0.15), 0 0 120px rgba(6,182,212,0.1), 0 20px 60px rgba(0,0,0,0.6)";
    return "0 0 60px rgba(234,179,8,0.15), 0 0 120px rgba(6,182,212,0.1), 0 20px 60px rgba(0,0,0,0.6)";
  };

  const btnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#9ca3af",
    textDecoration: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        position: "relative",
        height: `${projects.length * 100}vh`,
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ color: "#22d3ee", fontSize: "12px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "12px" }}>
              Portfolio
            </p>
            <h2 style={{ fontSize: "48px", fontWeight: 700, color: "#ffffff", margin: "0" }}>
              Security Projects
            </h2>
            <p style={{ color: "#6b7280", fontSize: "14px", maxWidth: "480px", margin: "16px auto 0" }}>
              All projects are built in a controlled lab environment for defensive security learning.
            </p>
          </div>

          <div style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "180px", background: "linear-gradient(to right, #000000 0%, transparent 100%)", zIndex: 10, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "180px", background: "linear-gradient(to left, #000000 0%, transparent 100%)", zIndex: 10, pointerEvents: "none" }} />

            <div
              style={{
                display: "flex",
                gap: "32px",
                transform: `translateX(calc(50vw - 240px + ${translateX}px))`,
                transition: "transform 0.08s linear",
                willChange: "transform",
              }}
            >
              {projects.map((project, index) => {
                const distance = Math.abs(index - activeIndex);
                const isActive = distance === 0;
                const isAdjacent = distance === 1;
                const scale = isActive ? 1 : isAdjacent ? 0.87 : 0.75;
                const opacity = isActive ? 1 : isAdjacent ? 0.4 : 0.15;
                const blur = isActive ? 0 : isAdjacent ? 1 : 3;

                return (
                  <div
                    key={index}
                    style={{
                      minWidth: "480px",
                      transform: `scale(${scale})`,
                      opacity,
                      filter: blur ? `blur(${blur}px)` : "none",
                      transition: "transform 0.5s cubic-bezier(0.33,1,0.68,1), opacity 0.5s ease, filter 0.5s ease",
                      transformOrigin: "center center",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: "20px",
                        padding: "32px",
                        border: `1px solid ${isActive ? "rgba(6,182,212,0.45)" : "rgba(255,255,255,0.06)"}`,
                        backgroundColor: isActive ? "rgba(6,182,212,0.04)" : "rgba(255,255,255,0.015)",
                        boxShadow: isActive ? getActiveGlow(project.status) : "none",
                        transition: "border-color 0.5s ease, background-color 0.5s ease, box-shadow 0.5s ease",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "4px 12px",
                          borderRadius: "999px",
                          marginBottom: "20px",
                          ...getStatusStyle(project.status),
                        }}
                      >
                        {project.status}
                      </span>

                      <h3 style={{ fontSize: "19px", fontWeight: 600, color: "#ffffff", lineHeight: 1.45, margin: "0 0 14px 0" }}>
                        {project.title}
                      </h3>

                      <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: 1.75, margin: "0" }}>
                        {project.description}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "22px" }}>
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "11px",
                              padding: "4px 11px",
                              borderRadius: "999px",
                              color: "#9ca3af",
                              backgroundColor: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                          marginTop: "28px",
                          paddingTop: "22px",
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {project.githubLink && (
                          <button
                            onClick={() => window.open(project.githubLink, "_blank")}
                            style={btnStyle}
                          >
                            <Github size={15} />
                            GitHub
                          </button>
                        )}
                        {index === 0 && (
                          <button onClick={onViewHostProject} style={btnStyle}>
                            <ExternalLink size={15} />
                            View Details
                          </button>
                        )}
                        {index === 1 && (
                          <button onClick={onViewWindowsProject} style={btnStyle}>
                            <ExternalLink size={15} />
                            View Details
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "44px" }}>
            {projects.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === activeIndex ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === activeIndex ? "#22d3ee" : "rgba(255,255,255,0.12)",
                  transition: "width 0.35s ease, background-color 0.35s ease",
                }}
              />
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              color: "#374151",
              fontSize: "11px",
              marginTop: "20px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {activeIndex < projects.length - 1
              ? `${activeIndex + 1} / ${projects.length} — Scroll to explore`
              : `${projects.length} / ${projects.length} — All projects viewed`}
          </p>

        </div>
      </div>
    </section>
  );
}