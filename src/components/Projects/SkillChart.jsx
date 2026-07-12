import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { skillTaxonomy } from '../../data';

const CATEGORY_COLORS = {
    'Frontend':    '#c5b0f4',
    'Backend':     '#c8e6cd',
    'Database':    '#f4ecd6',
    'Language':    '#efd4d4',
    'DevOps':      '#f3c9b6',
    'Low-Code':    '#dceeb1',
    'Integration': '#e6e6e6',
    'Soft Skill':  '#1f1d3d',
};

const SkillChart = ({ selectedSkill, onSelectSkill }) => {
    const { t } = useTranslation();
    const sorted = [...skillTaxonomy].sort((a, b) => b.proficiency - a.proficiency);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: '#f7f7f5', borderRadius: '24px', padding: '32px 28px', marginBottom: '48px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <p style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
                    letterSpacing: '0.60px', textTransform: 'uppercase',
                    color: '#666666', margin: 0,
                }}>{t('projects.skillChartLabel')}</p>
                {selectedSkill && (
                    <button
                        onClick={() => onSelectSkill(null)}
                        style={{
                            fontSize: '13px', color: '#888888', background: 'none', border: 'none',
                            cursor: 'pointer', textDecoration: 'underline', padding: 0,
                        }}
                    >
                        {t('projects.clearSkillFilter')}
                    </button>
                )}
            </div>

            <ResponsiveContainer width="100%" height={Math.max(320, sorted.length * 32)}>
                <BarChart data={sorted} layout="vertical" margin={{ left: 8, right: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e6e6e6" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#888888' }} axisLine={false} tickLine={false} />
                    <YAxis
                        type="category"
                        dataKey="label"
                        width={150}
                        tick={{ fontSize: 13, fill: '#000000' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Bar
                        dataKey="proficiency"
                        radius={[0, 8, 8, 0]}
                        cursor="pointer"
                        onClick={(data) => onSelectSkill(selectedSkill === data.id ? null : data.id)}
                        isAnimationActive={false}
                    >
                        {sorted.map((skill) => (
                            <Cell
                                key={skill.id}
                                fill={CATEGORY_COLORS[skill.category] || '#c5b0f4'}
                                opacity={!selectedSkill || selectedSkill === skill.id ? 1 : 0.3}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            <p style={{ fontSize: '12px', color: '#999999', marginTop: '12px', marginBottom: 0 }}>
                {t('projects.skillChartHint')}
            </p>
        </motion.div>
    );
};

export default SkillChart;
