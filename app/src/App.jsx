import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Beaker,
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Star,
  UserRoundCog,
  X,
  Copy,
  Check,
  Sparkles,
  Info,
  ChevronDown,
  ChevronRight,
  Users,
  Filter,
} from 'lucide-react';

const FAVORITES_KEY = 'quimera-favorites';

const baseCollaborators = [
  {
    id: 'q1',
    name: 'Laura Benitez',
    role: 'Directora de Operaciones Regulatorias',
    area: 'Regulatorio',
    phone: '+54 11 5550 2101',
    email: 'laura.benitez@quimera.demo',
    hireDate: '12 mar 2017',
    site: 'Buenos Aires',
    shift: 'Central',
    managerId: null,
    skills: ['Registro REACH', 'Auditorias GMP', 'Gestion de cambios'],
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q2',
    name: 'Tomas Uriarte',
    role: 'Jefe de Planta de Síntesis',
    area: 'Producción',
    phone: '+54 11 5550 2194',
    email: 'tomas.uriarte@quimera.demo',
    hireDate: '04 sep 2019',
    site: 'Zárate',
    shift: 'Mañana',
    managerId: 'q1',
    skills: ['Lotes piloto', 'Escalado industrial', 'Seguridad de procesos'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q3',
    name: 'Marina Ocampo',
    role: 'Especialista de Calidad Analítica',
    area: 'Calidad',
    phone: '+54 11 5550 2241',
    email: 'marina.ocampo@quimera.demo',
    hireDate: '23 ene 2021',
    site: 'Buenos Aires',
    shift: 'Central',
    managerId: 'q1',
    skills: ['HPLC', 'Desviaciones', 'Liberacion documental'],
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q4',
    name: 'Elias Correa',
    role: 'Supervisor de Turno Formulación',
    area: 'Producción',
    phone: '+54 11 5550 2288',
    email: 'elias.correa@quimera.demo',
    hireDate: '18 jul 2020',
    site: 'Córdoba',
    shift: 'Tarde',
    managerId: 'q2',
    skills: ['Mezclas complejas', 'Balance de linea', 'CAPA'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q5',
    name: 'Julieta Naon',
    role: 'Business Partner de Compras Técnicas',
    area: 'Abastecimiento',
    phone: '+54 11 5550 2312',
    email: 'julieta.naon@quimera.demo',
    hireDate: '07 may 2018',
    site: 'Buenos Aires',
    shift: 'Central',
    managerId: 'q1',
    skills: ['Materias primas criticas', 'Homologacion', 'Negociacion tecnica'],
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q6',
    name: 'Camilo Serra',
    role: 'Ingeniero de Seguridad de Procesos',
    area: 'EHS',
    phone: '+54 11 5550 2350',
    email: 'camilo.serra@quimera.demo',
    hireDate: '29 nov 2016',
    site: 'Zárate',
    shift: 'Central',
    managerId: 'q1',
    skills: ['HAZOP', 'LOPA', 'Permisos de trabajo'],
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q7',
    name: 'Valentina Pires',
    role: 'Líder de Desarrollo de Aplicaciones',
    area: 'I+D',
    phone: '+54 11 5550 2419',
    email: 'valentina.pires@quimera.demo',
    hireDate: '14 feb 2022',
    site: 'Rosario',
    shift: 'Central',
    managerId: 'q1',
    skills: ['Polimeros funcionales', 'Ensayos cliente', 'Transferencia tecnica'],
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q8',
    name: 'Rocío Infante',
    role: 'Analista Senior de Logística',
    area: 'Logística',
    phone: '+54 11 5550 2455',
    email: 'rocio.infante@quimera.demo',
    hireDate: '10 oct 2020',
    site: 'Buenos Aires',
    shift: 'Mañana',
    managerId: 'q5',
    skills: ['ADR', 'Ruteo de peligrosos', 'Inventario congelado'],
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q9',
    name: 'Germán Valdes',
    role: 'Coordinador de Mantenimiento Instrumental',
    area: 'Mantenimiento',
    phone: '+54 11 5550 2521',
    email: 'german.valdes@quimera.demo',
    hireDate: '02 abr 2015',
    site: 'Córdoba',
    shift: 'Noche',
    managerId: 'q2',
    skills: ['Calibracion', 'Paradas programadas', 'SCADA'],
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q10',
    name: 'Sofia Narvaez',
    role: 'HRBP Industrial',
    area: 'Personas',
    phone: '+54 11 5550 2570',
    email: 'sofia.narvaez@quimera.demo',
    hireDate: '15 ago 2021',
    site: 'Buenos Aires',
    shift: 'Central',
    managerId: 'q1',
    skills: ['Clima laboral', 'Turnos', 'Planes de carrera'],
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q11',
    name: 'Nicolás Varela',
    role: 'Químico de Desarrollo de Procesos',
    area: 'I+D',
    phone: '+54 11 5550 2613',
    email: 'nicolas.varela@quimera.demo',
    hireDate: '27 jun 2023',
    site: 'Rosario',
    shift: 'Tarde',
    managerId: 'q7',
    skills: ['DoE', 'Catálisis', 'Escalado'],
    photo: 'https://images.unsplash.com/photo-1504257400762-9712a8f0969a?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'q12',
    name: 'Patricia Mendez',
    role: 'Coordinadora de Calidad de Proveedores',
    area: 'Calidad',
    phone: '+54 11 5550 2690',
    email: 'patricia.mendez@quimera.demo',
    hireDate: '19 dic 2018',
    site: 'Buenos Aires',
    shift: 'Central',
    managerId: 'q3',
    skills: ['Auditorias externas', 'Especificaciones', 'Riesgo proveedor'],
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&h=150&q=80',
  },
];

const extraNames = [
  { name: 'Andrés Gómez', gender: 'male' },
  { name: 'Lucía Fernández', gender: 'female' },
  { name: 'Mateo Rodríguez', gender: 'male' },
  { name: 'Camila Silva', gender: 'female' },
  { name: 'Diego Martínez', gender: 'male' },
  { name: 'Valeria Rossi', gender: 'female' },
  { name: 'Martín López', gender: 'male' },
  { name: 'Natalia Castro', gender: 'female' },
  { name: 'Lucas Pérez', gender: 'male' },
  { name: 'Isabella Díaz', gender: 'female' },
  { name: 'Facundo González', gender: 'male' },
  { name: 'Clara Romero', gender: 'female' },
  { name: 'Santiago Ortega', gender: 'male' },
  { name: 'Elena Juárez', gender: 'female' },
  { name: 'Bruno Bianchi', gender: 'male' },
  { name: 'Paula Molina', gender: 'female' },
  { name: 'Joaquín Herrera', gender: 'male' },
  { name: 'Marta Giménez', gender: 'female' },
  { name: 'Gabriel Torres', gender: 'male' },
  { name: 'Daniela Flores', gender: 'female' },
  { name: 'Javier Ruiz', gender: 'male' },
  { name: 'Victoria Sosa', gender: 'female' },
  { name: 'Manuel Morales', gender: 'male' },
  { name: 'Florencia Medina', gender: 'female' },
  { name: 'Ramiro Peña', gender: 'male' },
  { name: 'Agustina Vidal', gender: 'female' },
  { name: 'Esteban Soria', gender: 'male' },
  { name: 'Mariana Acosta', gender: 'female' },
  { name: 'Federico Núñez', gender: 'male' },
  { name: 'Carla Benetti', gender: 'female' },
  { name: 'Hugo Domínguez', gender: 'male' },
  { name: 'Carolina Ferrer', gender: 'female' },
  { name: 'Ignacio Peralta', gender: 'male' },
  { name: 'Lucrecia Ramos', gender: 'female' },
  { name: 'Álvaro Mendoza', gender: 'male' },
  { name: 'Jimena Gil', gender: 'female' },
  { name: 'Julián Ortiz', gender: 'male' },
  { name: 'Renata Paz', gender: 'female' }
];

const femalePhotoIds = [
  'photo-1544005313-94ddf0286df2', 'photo-1534528741775-53994a69daeb', 'photo-1517841905240-472988babdf9',
  'photo-1524504388940-b1c1722653e1', 'photo-1487412720507-e7ab37603c6f', 'photo-1554151228-14d9def656e4',
  'photo-1531746020798-e6953c6e8e04', 'photo-1567532939604-b6b5b0db2604', 'photo-1573496359142-b8d87734a5a2',
  'photo-1508214751196-bcfd4ca60f91', 'photo-1580489944761-15a19d654956', 'photo-1548142813-c348350df52b'
];

const malePhotoIds = [
  'photo-1500648767791-00dcc994a43e', 'photo-1507003211169-0a1dd7228f2d', 'photo-1506794778202-cad84cf45f1d',
  'photo-1539571696357-5a69c17a67c6', 'photo-1504257400762-9712a8f0969a', 'photo-1519085360753-af0119f7cbe7',
  'photo-1492562080023-ab3db95bfbce', 'photo-1472099645785-5658abf4ff4e', 'photo-1522075469751-3a6694fb2f61',
  'photo-1560250097-0b93528c311a', 'photo-1531427186611-ecfd6d936c79', 'photo-1513956589380-bad6acb9b9d4'
];

const rolesByArea = {
  'Regulatorio': ['Analista de Asuntos Regulatorios', 'Especialista en Farmacovigilancia', 'Coordinador de Registros'],
  'Producción': ['Operario de Dosificación', 'Técnico de Envasado', 'Analista de Planificación', 'Supervisor de Reactor'],
  'Calidad': ['Analista de Control Físico-Químico', 'Inspector de Aseguramiento de Calidad', 'Técnico de Muestreo'],
  'Abastecimiento': ['Comprador de Material de Empaque', 'Analista de Planeación de Compras', 'Asistente de Comercio Exterior'],
  'EHS': ['Inspector de Seguridad Industrial', 'Analista Ambiental', 'Técnico de Salud Ocupacional'],
  'I+D': ['Químico de Formulación', 'Asistente de Ensayos de Estabilidad', 'Especialista en Síntesis Orgánica'],
  'Logística': ['Supervisor de Despacho', 'Analista de Expedición', 'Controlador de Inventarios'],
  'Mantenimiento': ['Electricista de Planta', 'Mecánico de Mantenimiento Predictivo', 'Técnico de Instrumentación'],
  'Personas': ['Analista de Selección y Reclutamiento', 'Coordinador de Capacitación', 'Asistente de Administración de Personal']
};

const sitesList = ['Buenos Aires', 'Zárate', 'Córdoba', 'Rosario'];
const shiftsList = ['Central', 'Mañana', 'Tarde', 'Noche'];

const skillsPool = {
  'Regulatorio': ['Dossier Técnico', 'Normas ANMAT', 'Auditoría REACH', 'Certificaciones ISO', 'Farmacopea'],
  'Producción': ['Reactores Batch', 'Normas GMP', 'Formulación Líquida', 'Mezclas Sólidas', 'Llenadoras'],
  'Calidad': ['HPLC', 'Espectrofotometría UV-Vis', 'Validación de Métodos', 'LIMS', 'OOS'],
  'Abastecimiento': ['Evaluación Proveedores', 'Contratos Técnicos', 'KPIs Compras', 'Importación', 'SAP MM'],
  'EHS': ['Evaluación de Riesgos', 'EPI / EPP', 'Residuos Peligrosos', 'Plan de Emergencias', 'ISO 45001'],
  'I+D': ['Diseño de Experimentos', 'Desarrollo Galénico', 'Síntesis Orgánica', 'Estabilidad Térmica', 'NMR'],
  'Logística': ['Cadena de Frío', 'Sustancias Peligrosas', 'Control FIFO', 'WMS', 'Distribución Química'],
  'Mantenimiento': ['Automatización PLC', 'Calibración de Sensores', 'Mecánica de Bombas', 'MTTR / MTBF', 'HVAC'],
  'Personas': ['Negociación Gremial', 'Nómina', 'Planes de Carrera', 'Clima Laboral', 'Inducción']
};

const extraCollaborators = extraNames.map((item, idx) => {
  const areaKeys = Object.keys(rolesByArea);
  const area = areaKeys[idx % areaKeys.length];
  const roles = rolesByArea[area];
  const role = roles[idx % roles.length];
  const site = sitesList[idx % sitesList.length];
  const shift = shiftsList[idx % shiftsList.length];
  
  const firstName = item.name.split(' ')[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lastName = item.name.split(' ')[1].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const email = `${firstName}.${lastName}@quimera.demo`;
  
  const idNumber = idx + 13;
  const id = `q${idNumber}`;
  const phone = `+54 11 5550 ${2600 + idNumber}`;
  const managerId = ['q1', 'q2', 'q3', 'q5', 'q7'][idx % 5];
  
  const hireYear = 2018 + (idx % 6);
  const hireMonth = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][idx % 12];
  const hireDay = String((idx % 28) + 1).padStart(2, '0');
  const hireDate = `${hireDay} ${hireMonth} ${hireYear}`;
  
  const areaSkills = skillsPool[area];
  const skills = [
    areaSkills[idx % areaSkills.length],
    areaSkills[(idx + 1) % areaSkills.length],
    areaSkills[(idx + 2) % areaSkills.length]
  ];
  
  const photoIds = item.gender === 'female' ? femalePhotoIds : malePhotoIds;
  const photo = `https://images.unsplash.com/${photoIds[idx % photoIds.length]}?auto=format&fit=crop&w=150&h=150&q=80`;

  return {
    id,
    name: item.name,
    role,
    area,
    phone,
    email,
    hireDate,
    site,
    shift,
    managerId,
    skills,
    photo
  };
});

const collaborators = baseCollaborators.concat(extraCollaborators);

const avatarClasses = [
  'from-teal-600 to-cyan-400',
  'from-indigo-650 to-blue-400',
  'from-slate-600 to-slate-350',
  'from-emerald-600 to-teal-350',
];

const AVATAR_COLORS = ['#0f766e', '#0c1e3a', '#475569', '#115e59'];

function App() {


  const [query, setQuery] = useState('');
  const [area, setArea] = useState('Todas');
  const [site, setSite] = useState('Todas');
  const [shift, setShift] = useState('Todos');
  const [selected, setSelected] = useState(null);
  const [copiedId, setCopiedId] = useState('');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const collaboratorsWithManager = useMemo(
    () =>
      collaborators.map((person) => ({
        ...person,
        manager: collaborators.find((candidate) => candidate.id === person.managerId)?.name || 'Dirección General',
      })),
    [],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return collaboratorsWithManager.filter((person) => {
      const matchesTerm =
        !term ||
        [person.name, person.role, person.manager, person.area, person.email, ...person.skills]
          .join(' ')
          .toLowerCase()
          .includes(term);
      return (
        matchesTerm &&
        (area === 'Todas' || person.area === area) &&
        (site === 'Todas' || person.site === site) &&
        (shift === 'Todos' || person.shift === shift)
      );
    });
  }, [area, collaboratorsWithManager, query, shift, site]);

  const areas = ['Todas', ...new Set(collaborators.map((item) => item.area))];
  const sites = ['Todas', ...new Set(collaborators.map((item) => item.site))];
  const shifts = ['Todos', ...new Set(collaborators.map((item) => item.shift))];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 1500);
  };

  const hasActiveFilters = area !== 'Todas' || site !== 'Todas' || shift !== 'Todos';



  return (
    <div className="min-h-screen selection:bg-teal-700/20 selection:text-teal-900">
      {/* TOP BAR — Swiss precision header */}
      <header style={{ borderBottom: '2px solid #0c1e3a', background: '#fff' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-4 select-none">
              <svg viewBox="0 0 24 24" style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Double helix / chemical lattice isotype */}
                <path d="M4.5 16.5c1.5-1.5 3-3 4.5-4.5 1.5 1.5 3 3 4.5 4.5 1.5-1.5 3-3 4.5-4.5" stroke="#0f766e" />
                <path d="M4.5 7.5c1.5 1.5 3 3 4.5 4.5 1.5-1.5 3-3 4.5-4.5 1.5 1.5 3 3 4.5 4.5" stroke="#0c1e3a" />
                <circle cx="4.5" cy="7.5" r="1.5" fill="#0c1e3a" stroke="none" />
                <circle cx="9" cy="12" r="1.5" fill="#0f766e" stroke="none" />
                <circle cx="13.5" cy="7.5" r="1.5" fill="#0c1e3a" stroke="none" />
                <circle cx="18" cy="12" r="1.5" fill="#0f766e" stroke="none" />
                <circle cx="4.5" cy="16.5" r="1.5" fill="#0f766e" stroke="none" />
                <circle cx="13.5" cy="16.5" r="1.5" fill="#0f766e" stroke="none" />
                <circle cx="18" cy="7.5" r="1.5" fill="#0c1e3a" stroke="none" />
              </svg>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: '#0c1e3a', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1 }}>
                    QUIMERA
                  </span>
                  <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', fontFamily: "sans-serif", background: '#0f766e', color: '#fff', padding: '2px 6px', borderRadius: 2 }}>
                    BIOTECH
                  </span>
                </div>
                <p style={{ fontSize: 10, color: '#64748b', margin: '3px 0 0', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Química y Laboratorios Farmacéuticos
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="hidden sm:flex items-center" style={{ border: '1px solid #e2e8f0' }}>
              <StatBlock icon={Users} label="Especialistas" value={collaborators.length} />
              <StatBlock icon={Building2} label="Sedes activas" value={sites.length - 1} />
              <StatBlock icon={Star} label="Favoritos" value={favorites.length} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* SEARCH BAR — prominent */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: '#64748b' }}
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre, cargo, habilidad o reportes..."
            className="search-input"
          />
        </div>

        {/* FILTER SELECTS — horizontal row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2" style={{ color: '#64748b' }}>
            <Filter size={14} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Filtros
            </span>
          </div>

          <select
            value={area}
            onChange={(event) => setArea(event.target.value)}
            style={{
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 500,
              border: '1px solid #e2e8f0',
              background: '#fff',
              color: '#1e293b',
              outline: 'none',
              fontFamily: 'Inter, system-ui, sans-serif',
              borderRadius: 0,
              cursor: 'pointer',
            }}
          >
            {areas.map((item) => (
              <option key={item}>{item === 'Todas' ? 'Todas las Áreas' : item}</option>
            ))}
          </select>

          <select
            value={site}
            onChange={(event) => setSite(event.target.value)}
            style={{
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 500,
              border: '1px solid #e2e8f0',
              background: '#fff',
              color: '#1e293b',
              outline: 'none',
              fontFamily: 'Inter, system-ui, sans-serif',
              borderRadius: 0,
              cursor: 'pointer',
            }}
          >
            {sites.map((item) => (
              <option key={item}>{item === 'Todas' ? 'Todas las Sedes' : item}</option>
            ))}
          </select>

          <select
            value={shift}
            onChange={(event) => setShift(event.target.value)}
            style={{
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 500,
              border: '1px solid #e2e8f0',
              background: '#fff',
              color: '#1e293b',
              outline: 'none',
              fontFamily: 'Inter, system-ui, sans-serif',
              borderRadius: 0,
              cursor: 'pointer',
            }}
          >
            {shifts.map((item) => (
              <option key={item}>{item === 'Todos' ? 'Todos los Turnos' : `Turno ${item}`}</option>
            ))}
          </select>
        </div>

        {/* ACTIVE FILTER CHIPS — removable pills */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap items-center gap-2 mb-4 overflow-hidden"
            >
              <span style={{ fontSize: 10, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Activos:
              </span>
              {area !== 'Todas' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="filter-chip filter-chip--active"
                >
                  <span>Área: {area}</span>
                  <button
                    type="button"
                    className="chip-remove"
                    onClick={() => setArea('Todas')}
                    aria-label="Quitar filtro área"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              )}
              {site !== 'Todas' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="filter-chip filter-chip--active"
                >
                  <span>Sede: {site}</span>
                  <button
                    type="button"
                    className="chip-remove"
                    onClick={() => setSite('Todas')}
                    aria-label="Quitar filtro sede"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              )}
              {shift !== 'Todos' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="filter-chip filter-chip--active"
                >
                  <span>Turno: {shift}</span>
                  <button
                    type="button"
                    className="chip-remove"
                    onClick={() => setShift('Todos')}
                    aria-label="Quitar filtro turno"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULTS COUNT */}
        <div
          className="flex items-center justify-between mb-2 pb-2"
          style={{ borderBottom: '1px solid #e2e8f0' }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b' }}>
            {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#0f766e',
              background: '#f0fdfa',
              padding: '3px 8px',
              border: '1px solid #ccfbf1',
            }}
          >
            SISTEMA MATRIZ
          </span>
        </div>

        {/* DATA TABLE */}
        {filtered.length ? (
          <table className="dir-table">
            <thead>
              <tr>
                <th style={{ width: 44 }}></th>
                <th style={{ width: '22%' }}>Nombre</th>
                <th style={{ width: '26%' }}>Cargo</th>
                <th style={{ width: '12%' }}>Área</th>
                <th style={{ width: '12%' }}>Sede</th>
                <th style={{ width: '10%' }}>Turno</th>
                <th style={{ width: 44, textAlign: 'center' }}>★</th>
                <th style={{ width: 36 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((person, index) => {
                const favorite = favorites.includes(person.id);
                const isExpanded = selected?.id === person.id;

                return (
                  <TableRow
                    key={person.id}
                    person={person}
                    index={index}
                    favorite={favorite}
                    isExpanded={isExpanded}
                    copiedId={copiedId}
                    onSelect={() => setSelected(isExpanded ? null : person)}
                    onToggleFav={(event) => {
                      event.stopPropagation();
                      setFavorites((current) =>
                        current.includes(person.id) ? current.filter((id) => id !== person.id) : [...current, person.id],
                      );
                    }}
                    onCopy={handleCopy}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <ShieldCheck size={36} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
            <p className="font-bold" style={{ fontSize: 16, color: '#1e293b' }}>
              Búsqueda sin coincidencia
            </p>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 4, maxWidth: 280, margin: '4px auto 0' }}>
              No se encontraron expertos con los filtros activos. Intenta otra combinación.
            </p>
          </div>
        )}
      </div>

      <footer className="py-8 text-center text-sm border-t" style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc', marginTop: 40 }}>
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ color: '#64748b' }}>&copy; {new Date().getFullYear()} Quimera Biotech. Todos los derechos reservados.</p>
          <div className="footer-dev">
            <span>Desarrollado por</span>
            <a href="https://jose-socola-jdss.github.io/blyp/" className="footer-logo-link" aria-label="Ir a Blyp">
              <img src="./blyp_logotipo.svg" alt="Blyp Logo" className="footer-logo" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ======== TABLE ROW WITH EXPANDABLE DETAIL ======== */
function TableRow({ person, index, favorite, isExpanded, copiedId, onSelect, onToggleFav, onCopy }) {
  const bgColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const initials = person.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  return (
    <>
      <tr
        className={`dir-row ${isExpanded ? 'active-row' : ''}`}
        onClick={onSelect}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {/* Avatar */}
        <td style={{ padding: '8px 8px 8px 16px' }}>
          <div className="avatar-circle overflow-hidden relative" style={{ background: bgColor }}>
            {person.photo ? (
              <img src={person.photo} alt={person.name} className="w-full h-full object-cover rounded-full" />
            ) : (
              initials
            )}
          </div>
        </td>

        {/* Name */}
        <td data-label="Nombre" style={{ fontWeight: 600, color: '#0c1e3a' }}>
          {person.name}
        </td>

        {/* Role */}
        <td data-label="Cargo" style={{ color: '#475569', fontSize: 12 }}>
          {person.role}
        </td>

        {/* Area */}
        <td data-label="Área">
          <span
            style={{
              display: 'inline-block',
              padding: '2px 8px',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: '#f0fdfa',
              color: '#0f766e',
              border: '1px solid #ccfbf1',
            }}
          >
            {person.area}
          </span>
        </td>

        {/* Site */}
        <td data-label="Sede" style={{ fontSize: 12, color: '#475569' }}>
          <span className="flex items-center gap-1">
            <MapPin size={12} style={{ color: '#94a3b8' }} />
            {person.site}
          </span>
        </td>

        {/* Shift */}
        <td data-label="Turno" style={{ fontSize: 12, color: '#475569' }}>
          {person.shift}
        </td>

        {/* Favorite */}
        <td style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={onToggleFav}
            className={`fav-btn ${favorite ? 'fav-btn--active' : ''}`}
            aria-label="Favorito"
          >
            <Star size={13} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </td>

        {/* Expand indicator */}
        <td style={{ textAlign: 'center', color: '#94a3b8' }}>
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </td>
      </tr>

      {/* EXPANDED DETAIL ROW */}
      <AnimatePresence>
        {isExpanded && (
          <tr className="detail-row">
            <td colSpan={8}>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div className="detail-content">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Large Photo Card */}
                    <div className="flex-shrink-0">
                      <div className="avatar-circle avatar-circle--lg overflow-hidden relative shadow-md border border-slate-200" style={{ background: bgColor }}>
                        {person.photo ? (
                          <img src={person.photo} alt={person.name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          initials
                        )}
                      </div>
                    </div>
                    
                    {/* Info Columns */}
                    <div className="flex-grow grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {/* Contact info */}
                      <div>
                        <h4
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: '#0c1e3a',
                            marginBottom: 10,
                          }}
                        >
                          Contacto
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2 group">
                            <span className="flex items-center gap-2" style={{ fontSize: 13, color: '#1e293b' }}>
                              <Phone size={13} style={{ color: '#0f766e' }} />
                              {person.phone}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onCopy(person.phone, `${person.id}-phone`);
                              }}
                              className="copy-btn opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedId === `${person.id}-phone` ? (
                                <>
                                  <Check size={10} /> Listo
                                </>
                              ) : (
                                <>
                                  <Copy size={10} /> Copiar
                                </>
                              )}
                            </button>
                          </div>
                          <div className="flex items-center justify-between gap-2 group">
                            <span className="flex items-center gap-2" style={{ fontSize: 13, color: '#1e293b' }}>
                              <Mail size={13} style={{ color: '#0f766e' }} />
                              {person.email}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onCopy(person.email, `${person.id}-email`);
                              }}
                              className="copy-btn opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedId === `${person.id}-email` ? (
                                <>
                                  <Check size={10} /> Listo
                                </>
                              ) : (
                                <>
                                  <Copy size={10} /> Copiar
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Organizational */}
                      <div>
                        <h4
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: '#0c1e3a',
                            marginBottom: 10,
                          }}
                        >
                          Estructura Organizacional
                        </h4>
                        <div className="space-y-2" style={{ fontSize: 13, color: '#1e293b' }}>
                          <div className="flex items-center gap-2">
                            <Building2 size={13} style={{ color: '#0f766e' }} />
                            <span>
                              <span style={{ color: '#64748b', fontSize: 11 }}>Área:</span> {person.area}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={13} style={{ color: '#0f766e' }} />
                            <span>
                              <span style={{ color: '#64748b', fontSize: 11 }}>Sede:</span> {person.site}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays size={13} style={{ color: '#0f766e' }} />
                            <span>
                              <span style={{ color: '#64748b', fontSize: 11 }}>Ingreso:</span> {person.hireDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={13} style={{ color: '#0f766e' }} />
                            <span>
                              <span style={{ color: '#64748b', fontSize: 11 }}>Turno:</span> {person.shift}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <UserRoundCog size={13} style={{ color: '#0f766e' }} />
                            <span>
                              <span style={{ color: '#64748b', fontSize: 11 }}>Reporta a:</span>{' '}
                              <span style={{ fontWeight: 600, color: '#0f766e' }}>{person.manager}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4
                          className="flex items-center gap-1.5"
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: '#0c1e3a',
                            marginBottom: 10,
                          }}
                        >
                          <Sparkles size={12} style={{ color: '#0f766e' }} />
                          Foco Técnico Especializado
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {person.skills.map((skill) => (
                            <span key={skill} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}

/* ======== STAT BLOCK ======== */
function StatBlock({ icon: Icon, label, value }) {
  return (
    <div className="stat-block">
      <div className="flex items-center gap-1.5">
        <Icon size={12} style={{ color: '#0f766e' }} />
        <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
          {label}
        </span>
      </div>
      <p className="font-extrabold" style={{ fontSize: 20, color: '#0c1e3a', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
        {value}
      </p>
    </div>
  );
}

export default App;
