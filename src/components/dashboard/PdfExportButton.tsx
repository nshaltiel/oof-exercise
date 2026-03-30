'use client';

import { Note } from '@/types/note';
import { BinType, BIN_CONFIG } from '@/types/bin';

interface PdfExportButtonProps {
  notes: Note[];
  binType: BinType;
  sessionTitle: string;
  schoolName: string;
}

export default function PdfExportButton({ notes, binType, sessionTitle, schoolName }: PdfExportButtonProps) {
  const config = BIN_CONFIG[binType];

  const handleExport = async () => {
    // Dynamic import to avoid SSR issues
    const { pdf, Document, Page, Text, View, StyleSheet, Font } = await import(
      '@react-pdf/renderer'
    );

    // Register Hebrew font
    Font.register({
      family: 'Heebo',
      src: '/fonts/Heebo-Regular.ttf',
    });

    const styles = StyleSheet.create({
      page: {
        padding: 40,
        fontFamily: 'Heebo',
        direction: 'rtl',
      },
      header: {
        marginBottom: 20,
        borderBottom: '2px solid #6c5ce7',
        paddingBottom: 10,
      },
      title: {
        fontSize: 24,
        textAlign: 'right',
        marginBottom: 5,
      },
      subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
      },
      binTitle: {
        fontSize: 18,
        textAlign: 'right',
        marginBottom: 15,
        color: config.color,
      },
      noteItem: {
        flexDirection: 'row-reverse',
        marginBottom: 8,
        padding: 8,
        backgroundColor: config.bgColor,
        borderRadius: 4,
      },
      noteNumber: {
        fontSize: 12,
        color: '#999',
        marginLeft: 8,
        textAlign: 'right',
      },
      noteText: {
        fontSize: 14,
        textAlign: 'right',
        flex: 1,
      },
      footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 10,
        color: '#999',
      },
    });

    const PdfDoc = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>{sessionTitle}</Text>
            <Text style={styles.subtitle}>
              {schoolName} | {new Date().toLocaleDateString('he-IL')}
            </Text>
          </View>

          <Text style={styles.binTitle}>
            {config.icon} {config.label} ({notes.length} פתקים)
          </Text>

          {notes.map((note, i) => (
            <View key={note.id} style={styles.noteItem}>
              <Text style={styles.noteNumber}>{i + 1}.</Text>
              <Text style={styles.noteText}>{note.text}</Text>
            </View>
          ))}

          <Text style={styles.footer}>נוצר באמצעות תרגיל האוף</Text>
        </Page>
      </Document>
    );

    const blob = await pdf(<PdfDoc />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sessionTitle} - ${config.label}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={notes.length === 0}
      className="flex items-center gap-2 bg-white border-2 border-gray-200 px-4 py-2 rounded-xl text-sm hover:border-[#6c5ce7] transition-colors disabled:opacity-50"
    >
      📄 ייצוא PDF
    </button>
  );
}
