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
  Info
} from 'lucide-react';

const FAVORITES_KEY = 'quimera-favorites';

const collaborators = [
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
  },
];

const avatarClasses = [
  'from-teal-600 to-cyan-400',
  'from-indigo-650 to-blue-400',
  'from-slate-600 to-slate-350',
  'from-emerald-600 to-teal-350',
];

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

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 selection:bg-teal-500/20 selection:text-teal-900">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* LABORATORY DATABASE HEADER */}
        <header className="rounded-3xl border border-teal-500/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-650 p-2.5 flex items-center justify-center shadow-sm">
                <Beaker className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">QUIMERA SOLUCIONES</p>
                  <span className="text-[9px] tracking-wider font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200/50">
                    SISTEMA MATRIZ
                  </span>
                </div>
                <h1 className="text-2xl font-black text-indigo-950">Directorio de Expertos Químicos</h1>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 shrink-0">
              <TopCard icon={Beaker} label="Especialistas" value={collaborators.length} />
              <TopCard icon={Building2} label="Sedes activas" value={sites.length - 1} />
              <TopCard icon={Star} label="Favoritos" value={favorites.length} />
            </div>
          </div>
        </header>

        {/* SEARCH AND CONTROL BAR */}
        <section className="rounded-2xl border border-teal-500/10 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-slate-400" size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre, cargo, habilidad o reportes..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs outline-none focus:border-teal-600 transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <select
                value={area}
                onChange={(event) => setArea(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-700 outline-none focus:border-teal-600 transition"
              >
                {areas.map((item) => (
                  <option key={item}>{item === 'Todas' ? 'Todas las Áreas' : item}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <select
                value={site}
                onChange={(event) => setSite(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-700 outline-none focus:border-teal-600 transition"
              >
                {sites.map((item) => (
                  <option key={item}>{item === 'Todas' ? 'Todas las Sedes' : item}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <select
                value={shift}
                onChange={(event) => setShift(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-700 outline-none focus:border-teal-600 transition"
              >
                {shifts.map((item) => (
                  <option key={item}>{item === 'Todos' ? 'Todos los Turnos' : `Turno ${item}`}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* COLLABORATORS GRID */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.length ? (
            filtered.map((person, index) => {
              const favorite = favorites.includes(person.id);
              return (
                <div
                  key={person.id}
                  onClick={() => setSelected(person)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelected(person);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="card rounded-3xl p-5 text-left transition hover:-translate-y-1 hover:border-teal-500/20 hover:shadow-md cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Avatar and Fav */}
                    <div className="mb-4 flex items-start justify-between">
                      <Avatar name={person.name} className={avatarClasses[index % avatarClasses.length]} />
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setFavorites((current) =>
                            current.includes(person.id) ? current.filter((id) => id !== person.id) : [...current, person.id],
                          );
                        }}
                        className={`rounded-lg p-2 border transition ${
                          favorite
                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-xs'
                            : 'bg-slate-50 text-slate-400 hover:text-slate-700 border-slate-200/60'
                        }`}
                        aria-label="Favorito"
                      >
                        <Star size={14} fill={favorite ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Person main tags */}
                    <h3 className="text-lg font-bold text-indigo-950 truncate">{person.name}</h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{person.role}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5 text-[9px] font-bold uppercase tracking-wider">
                      <span className="rounded bg-teal-500/10 px-2 py-0.5 text-teal-700 border border-teal-500/10">
                        {person.area}
                      </span>
                      <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-indigo-700 border border-indigo-500/10">
                        {person.shift}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600 border border-slate-200/50">
                        {person.site}
                      </span>
                    </div>

                    {/* Technical details contact */}
                    <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600 font-mono">
                      <div className="flex items-center justify-between gap-2 group">
                        <span className="flex items-center gap-1.5"><Phone size={13} className="text-slate-400" /> {person.phone}</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleCopy(person.phone, `${person.id}-phone`); }}
                          className="text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition hover:underline"
                        >
                          {copiedId === `${person.id}-phone` ? 'Copiado' : 'Copiar'}
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2 group">
                        <span className="flex items-center gap-1.5 truncate"><Mail size={13} className="text-slate-400" /> {person.email}</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleCopy(person.email, `${person.id}-email`); }}
                          className="text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition hover:underline"
                        >
                          {copiedId === `${person.id}-email` ? 'Copiado' : 'Copiar'}
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 leading-normal">
                        <UserRoundCog size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate">Reporta a: {person.manager}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills preview list */}
                  <div className="mt-4 flex flex-wrap gap-1 border-t border-slate-100 pt-3">
                    {person.skills.slice(0, 2).map((skill) => (
                      <span key={skill} className="rounded bg-slate-50 border border-slate-150 px-2 py-0.5 text-[10px] text-slate-500 font-medium truncate max-w-[120px]">
                        {skill}
                      </span>
                    ))}
                    {person.skills.length > 2 && (
                      <span className="rounded bg-slate-50 border border-slate-150 px-2 py-0.5 text-[10px] text-slate-400 font-medium">
                        +{person.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="sm:col-span-2 xl:col-span-3 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-12 text-center flex flex-col items-center justify-center">
              <ShieldCheck className="h-10 w-10 text-slate-400 mb-3" />
              <p className="text-base font-bold text-slate-800">Búsqueda sin coincidencia</p>
              <p className="mt-1 text-xs text-slate-500 max-w-[280px]">No se encontraron expertos con los filtros activos. Intenta otra combinación.</p>
            </div>
          )}
        </section>
      </div>

      {/* DETAIL MODAL PANEL */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 z-10 flex flex-col gap-5 text-left"
            >
              {/* Header profile row */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-4">
                  <Avatar name={selected.name} className="from-teal-600 via-teal-700 to-indigo-700 h-16 w-16 text-xl shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-teal-600">Registro Químico Interno</span>
                    <h2 className="text-2xl font-black text-indigo-950 leading-snug">{selected.name}</h2>
                    <p className="text-xs text-slate-500 font-semibold">{selected.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:text-slate-800"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Precise Telemetry Grid */}
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <DetailGridItem icon={Building2} label="Área de Foco" value={selected.area} />
                <DetailGridItem icon={MapPin} label="Sede Operativa" value={selected.site} />
                <DetailGridItem icon={CalendarDays} label="Fecha de Ingreso" value={selected.hireDate} />
                <DetailGridItem icon={ShieldCheck} label="Turno Laboral" value={selected.shift} />
                <DetailGridItem icon={Phone} label="Teléfono Interno" value={selected.phone} />
                <DetailGridItem icon={Mail} label="Correo Electrónico" value={selected.email} />
              </div>

              {/* Direct Reporting */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100/60 flex flex-col gap-1">
                <span className="text-[9px] uppercase font-bold tracking-wider text-indigo-900">Estructura Organizacional</span>
                <p className="text-sm font-semibold text-slate-850">Reporta directamente a: <span className="text-teal-600">{selected.manager}</span></p>
              </div>

              {/* Skills Tags */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100/60 flex flex-col gap-3">
                <span className="text-[9px] uppercase font-bold tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-teal-600" /> Foco Técnico Especializado
                </span>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((skill) => (
                    <span key={skill} className="rounded-lg bg-white border border-slate-200/50 px-3 py-1.5 text-xs text-slate-700 font-semibold shadow-2xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Subcomponents helpers
function Avatar({ name, className = '' }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  return (
    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-base font-black text-white ${className}`}>
      {initials}
    </div>
  );
}

function TopCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between shrink-0 shadow-3xs">
      <div className="flex items-center gap-1.5 text-teal-600 mb-1.5">
        <Icon size={14} />
        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">{label}</span>
      </div>
      <p className="text-xl font-black text-indigo-950 leading-tight">{value}</p>
    </div>
  );
}

function DetailGridItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100/80 flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-wider text-slate-500">
        <Icon size={13} className="text-teal-600" /> {label}
      </span>
      <p className="text-xs font-semibold text-slate-850 truncate">{value}</p>
    </div>
  );
}

export default App;
