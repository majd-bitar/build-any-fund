export default function FeatureTimelineItem({ Icon, title, items, delay = 0 }) {
    return (
      <motion.div
        className={styles.timelineItem}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
      >
        <div className={styles.icon}><Icon size={24} /></div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  }
  