# Traffic Intersection Simulator

A full-stack, highly interactive traffic intersection simulation engine built with **TypeScript**. This project allows users to design complex intersections, configure lane turns, and simulate vehicle and pedestrian traffic. It features a rich Web GUI for real-time visualization and a functional backend for traffic simulation.

## 🚀 Deployment

The application is deployed and publicly accessible using **Cloudflare Tunnels**.

🔗 **Live App:** [Traffic Sim](https://traffic-sim.piechnik.com.pl/)

> [!NOTE]
> The "Standard Intersection" option contains pre-selected Actions list, so you can click "Next" > "Next" and watch the simulation right away. The rest of the buttons have the same effect, but they don't contain this basic Actions list.

## 🌟 Key Features
* **Custom Intersection Engine:** Define and render 4-way intersections with variable lane counts and dynamic turn restrictions (preventing collidable trajectories).
* **Visual Editor & Playback:** An easy to use React frontend utilizing `react-konva` to construct simulations and render playback of the server's output state.
* **Traffic Controllers:** Drivers follow the road traffic law, respect red light indicators and right hand rule priority.
* **Headless CLI Support:** Run simulations directly from the terminal using standard JSON inputs and outputs.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [Docker](https://www.docker.com/) (for running the full-stack GUI)

### 1. Running the CLI Simulation (Automated Mode)
The simulation can be executed purely via the terminal using a single command. It takes an input JSON and generates an output JSON. Examples for these files are in `backend/examples/` directory.

```bash
# Install dependencies
npm install

# Run the simulation engine via CLI
npm run simulate -- input.json output.json
```

### 2. Running the Visualizer GUI (Full-Stack Mode)
To experience the graphical intersection builder and the playback engine, start the containerized environment. This spins up the Express backend, the React frontend, and an Nginx reverse proxy.

```bash
# Start the Docker environment
docker compose up --build
```
Navigate to **`http://localhost:8080`** in your browser.

---

## 🧠 Traffic Light Algorithm: `simple-controller`

The project currently implements a baseline `simple-controller` controller to manage the intersection's flow. 

**How it works:**
1.  **Fixed-Time Phasing:** The controller operates on a deterministic, time-based cycle, alternating the `greenAxis` between the North-South (`vertical`) and East-West (`horizontal`) roads.
2.  **Conflict Resolution:** Vehicles going `straightAhead` or turning `right` are given priority during their axis's green phase, while left-turning vehicles must yield to oncoming traffic.
3.  **Pedestrian Safety:** Pedestrians are allowed to cross parallel to the active `greenAxis`. Vehicles wait at the `preCrosswalk` state if pedestrians are actively crossing the destination road.

---

## 🏗️ Architecture & Technologies

The project follows a decoupled client-server architecture to ensure high performance and maintainability:

**Frontend React & MaterialUI:**
Render current user settings (the intersection and actions which will take place), and the result from the server using modern styling library MaterialUI for a familiar look and better UX.

**Backend Node.js & Express:**
Serves as the API for the GUI and performs the simulation.

**Infrastructure Docker & Nginx:**
Containerized for easy deployment and local development. Nginx proxies `/api` requests to the backend while serving the frontend.

---

## 📺 Application Views

The application provides an intuitive interface for designing and simulating traffic intersections. Below are screenshots of each main view:

### Main Menu
Starting point of the application where users can choose between creating a new intersection simulation or accessing other features.

<img width="1920" height="920" alt="image" src="https://github.com/user-attachments/assets/a1f659e2-2230-4378-8afb-9d5997907aef" />

### Crossroad Builder
Visual editor for designing custom intersections. Users can configure roads, lanes, and define turn restrictions to prevent collisions.

<img width="1512" height="824" alt="Screenshot 2026-06-10 at 03 43 19" src="https://github.com/user-attachments/assets/2ff44c7c-f7fb-4fc7-b47d-92c548601714" />

### Action Builder
Interface for creating and configuring traffic simulation commands. Users define vehicle and pedestrian actions to simulate real-world traffic scenarios.

<img width="1512" height="824" alt="Screenshot 2026-06-10 at 03 43 07" src="https://github.com/user-attachments/assets/ff14b68f-01e7-4af8-8347-092cdc27b419" />

### Results
Playback and visualization of the simulation results. Shows the real-time movement of vehicles and pedestrians through the configured intersection.

<img width="1512" height="825" alt="Screenshot 2026-06-10 at 03 42 52" src="https://github.com/user-attachments/assets/d552267a-52f4-435d-9be8-22405ea930bc" />

---

## 📊 Analytics

This application includes **Google Analytics** integration for tracking user interactions and gathering insights on application usage patterns.

<img width="1512" height="824" alt="Screenshot 2026-06-10 at 03 12 03" src="https://github.com/user-attachments/assets/2ccd374a-a851-4979-85bc-0515f4571bb9" />

This application includes **Hotjar** integration for tracking user interactions, analyzing behavior using heatmaps, and gathering insights on application usage patterns.

<img width="1920" height="877" alt="Screenshot of Hotjar Heatmap" src="https://github.com/user-attachments/assets/40771a12-cdef-4d88-b835-85895e4001ae" />

