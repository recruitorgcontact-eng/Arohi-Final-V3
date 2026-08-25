import { MockTest } from '../types/examTypes';

/**
 * Intelligent categorization logic that maps all mock tests across all
 * specialized datasets to the 11 target sector categories in MockTestCatalog.
 */
export function classifyTestCategory(test: Partial<MockTest>): string {
  const main = (test.mainCategory || '').toLowerCase();
  const sub = (test.subCategory || '').toLowerCase();
  const target = (test.targetExam || '').toLowerCase();
  const title = (test.title || '').toLowerCase();
  const board = (test.board || '').toLowerCase();
  const desc = (test.shortDescription || '').toLowerCase();

  // 1. School Boards (Class 1 - 12, CBSE, ICSE, State Boards, Olympiads, Navodaya)
  if (
    main === 'school_boards' ||
    sub.includes('school_') ||
    sub.includes('cbse_') ||
    sub.includes('icse_') ||
    sub.includes('bse_odisha_') ||
    sub.includes('chse_odisha_') ||
    sub.includes('navodaya') ||
    sub.includes('sainik') ||
    sub.includes('olympiad') ||
    target.includes('class ') ||
    title.includes('class 1') ||
    title.includes('class 2') ||
    title.includes('class 3') ||
    title.includes('class 4') ||
    title.includes('class 5') ||
    title.includes('class 6') ||
    title.includes('class 7') ||
    title.includes('class 8') ||
    title.includes('class 9') ||
    title.includes('class 10') ||
    title.includes('class 12') ||
    title.includes('cbse') ||
    title.includes('icse') ||
    board.includes('cbse') ||
    board.includes('icse') ||
    board.includes('bse odisha') ||
    board.includes('chse odisha') ||
    board.includes('state board')
  ) {
    return 'school_boards';
  }

  // 2. Medical & Nursing (NEET UG, NEET PG, INI-CET, AIIMS NORCET, ESIC, DSSSB Nursing, NCLEX, CHO)
  if (
    main === 'medical_neet_nursing' ||
    main === 'nursing' ||
    sub.includes('norcet') ||
    sub.includes('nursing') ||
    sub.includes('neet_') ||
    sub.includes('ini_cet') ||
    sub.includes('nclex') ||
    sub.includes('cho_') ||
    sub.includes('jipmer') ||
    sub.includes('mns_') ||
    target.includes('neet') ||
    target.includes('norcet') ||
    target.includes('aiims') ||
    target.includes('nursing') ||
    target.includes('nclex') ||
    target.includes('ini-cet') ||
    target.includes('esic nursing') ||
    title.includes('norcet') ||
    title.includes('neet ug') ||
    title.includes('neet pg') ||
    title.includes('ini-cet') ||
    title.includes('nursing officer') ||
    title.includes('nclex')
  ) {
    return 'medical_neet_nursing';
  }

  // 3. Engineering & GATE (JEE Main, JEE Adv, GATE, BITSAT, WBJEE, NIMCET, DRDO, ISRO)
  if (
    main === 'engineering_jee_gate' ||
    sub.includes('jee_') ||
    sub.includes('bitsat') ||
    sub.includes('wbjee') ||
    sub.includes('gate_') ||
    sub.includes('nimcet') ||
    sub.includes('drdo') ||
    sub.includes('isro') ||
    target.includes('jee') ||
    target.includes('gate') ||
    target.includes('bitsat') ||
    target.includes('wbjee') ||
    target.includes('nimcet') ||
    target.includes('drdo') ||
    target.includes('isro') ||
    title.includes('jee main') ||
    title.includes('jee advanced') ||
    title.includes('gate ') ||
    title.includes('bitsat') ||
    title.includes('wbjee') ||
    title.includes('nimcet') ||
    title.includes('drdo ceptam') ||
    title.includes('isro assistant')
  ) {
    return 'engineering_jee_gate';
  }

  // 4. Teaching & TET (CTET, Super TET, REET, KVS, NVS, UGC NET, CSIR NET, State TETs)
  if (
    main === 'teaching_tet_ctet' ||
    sub.includes('tet') ||
    sub.includes('ctet') ||
    sub.includes('kvs_') ||
    sub.includes('nvs_') ||
    sub.includes('ugc_net') ||
    sub.includes('csir_net') ||
    sub.includes('reet') ||
    target.includes('ctet') ||
    target.includes('tet') ||
    target.includes('super tet') ||
    target.includes('reet') ||
    target.includes('ugc net') ||
    target.includes('csir net') ||
    target.includes('kvs') ||
    target.includes('nvs') ||
    target.includes('teacher') ||
    title.includes('ctet') ||
    title.includes('super tet') ||
    title.includes('reet') ||
    title.includes('ugc net') ||
    title.includes('csir net') ||
    title.includes('kvs') ||
    title.includes('nvs')
  ) {
    return 'teaching_tet_ctet';
  }

  // 5. Police & Paramilitary (State Police, SI, Constable, Sepoy, Delhi Police, UP Police, Bihar Police)
  if (
    main === 'police_state_cadres' ||
    main === 'defence_paramilitary' ||
    sub.includes('police') ||
    sub.includes('daroga') ||
    sub.includes('constable') ||
    sub.includes('sepoy') ||
    sub.includes('police_si') ||
    target.includes('police') ||
    target.includes('daroga') ||
    target.includes('constable') ||
    target.includes('sepoy') ||
    target.includes('delhi police') ||
    target.includes('up police') ||
    target.includes('bihar police') ||
    target.includes('odisha police') ||
    title.includes('police constable') ||
    title.includes('police si') ||
    title.includes('daroga') ||
    title.includes('sepoy')
  ) {
    return 'police_state_cadres';
  }

  // 6. 28 State PSCs & SSBs (BPSC, UPPSC, WBPSC, MPSC, OPSC, OSSSC, APPSC, TSPSC, KPSC, RAS/RPSC, MPPSC)
  if (
    main === 'state_psc_all_28' ||
    sub.includes('bpsc') ||
    sub.includes('uppsc') ||
    sub.includes('wbpsc') ||
    sub.includes('wbcs') ||
    sub.includes('mpsc') ||
    sub.includes('opsc') ||
    sub.includes('osssc') ||
    sub.includes('appsc') ||
    sub.includes('tspsc') ||
    sub.includes('kpsc') ||
    sub.includes('ras') ||
    sub.includes('rpsc') ||
    sub.includes('mppsc') ||
    target.includes('bpsc') ||
    target.includes('uppsc') ||
    target.includes('wbcs') ||
    target.includes('wbpsc') ||
    target.includes('mpsc') ||
    target.includes('opsc') ||
    target.includes('osssc') ||
    target.includes('civil services') && (test.state && test.state !== 'All-India / Central') ||
    title.includes('bpsc') ||
    title.includes('uppsc') ||
    title.includes('wbcs') ||
    title.includes('wbpsc') ||
    title.includes('mpsc state') ||
    title.includes('opsc oas') ||
    title.includes('osssc combined')
  ) {
    return 'state_psc_all_28';
  }

  // 7. Management & Law (CAT, CLAT, IPMAT, CUET UG/Commerce, NID/NIFT, NCHMCT)
  if (
    main === 'management_cat_mba' ||
    main === 'law_clat_judiciary' ||
    sub.includes('cat_') ||
    sub.includes('clat') ||
    sub.includes('ipmat') ||
    sub.includes('cuet_') ||
    sub.includes('nid_') ||
    sub.includes('nift') ||
    sub.includes('nchmct') ||
    target.includes('cat') ||
    target.includes('clat') ||
    target.includes('ipmat') ||
    target.includes('cuet') ||
    target.includes('nid') ||
    target.includes('nift') ||
    target.includes('nchmct') ||
    target.includes('law') ||
    target.includes('mba') ||
    title.includes('cat 202') ||
    title.includes('clat 202') ||
    title.includes('ipmat') ||
    title.includes('cuet ug') ||
    title.includes('nid dat') ||
    title.includes('nchmct')
  ) {
    return 'management_cat_mba';
  }

  // 8. Banking & Financial (IBPS PO/Clerk, SBI PO/Clerk, RBI Grade B/Assistant, SEBI, NABARD, LIC)
  if (
    main === 'banking_ibps' ||
    main === 'sbi_rbi_financial' ||
    sub.includes('ibps') ||
    sub.includes('sbi_') ||
    sub.includes('rbi_') ||
    sub.includes('sebi') ||
    sub.includes('nabard') ||
    sub.includes('lic_') ||
    sub.includes('insurance') ||
    target.includes('ibps') ||
    target.includes('sbi') ||
    target.includes('rbi') ||
    target.includes('sebi') ||
    target.includes('nabard') ||
    target.includes('lic') ||
    target.includes('bank') ||
    title.includes('ibps') ||
    title.includes('sbi po') ||
    title.includes('sbi clerk') ||
    title.includes('rbi grade b') ||
    title.includes('rbi assistant') ||
    title.includes('sebi grade a') ||
    title.includes('nabard grade a') ||
    title.includes('lic aao')
  ) {
    return 'banking_ibps';
  }

  // 9. Railways (RRB NTPC, Group D, RRB JE, ALP)
  if (
    main === 'railway_rrb' ||
    sub.includes('rrb_') ||
    sub.includes('railway') ||
    target.includes('rrb') ||
    target.includes('railway') ||
    target.includes('ntpc') ||
    target.includes('group d') ||
    title.includes('rrb ntpc') ||
    title.includes('rrb group d') ||
    title.includes('rrb junior engineer') ||
    title.includes('railway')
  ) {
    return 'railway_rrb';
  }

  // 10. SSC Recruitment (SSC CGL, CHSL, MTS, CPO, Steno, Selection Post, GD)
  if (
    main === 'ssc_graduate_12th' ||
    sub.includes('ssc_') ||
    target.includes('ssc') ||
    target.includes('staff selection') ||
    title.includes('ssc cgl') ||
    title.includes('ssc chsl') ||
    title.includes('ssc mts') ||
    title.includes('ssc cpo') ||
    title.includes('ssc stenographer') ||
    title.includes('ssc selection post')
  ) {
    return 'ssc_graduate_12th';
  }

  // 11. UPSC & Civil Services (UPSC CSE, IAS, IPS, CSAT, CDS, NDA, CAPF, AFCAT)
  if (
    main === 'upsc_civil' ||
    sub.includes('upsc') ||
    sub.includes('cse') ||
    sub.includes('cds') ||
    sub.includes('capf') ||
    sub.includes('afcat') ||
    sub.includes('nda') ||
    target.includes('upsc') ||
    target.includes('civil services') ||
    target.includes('cse') ||
    target.includes('cds') ||
    target.includes('capf') ||
    target.includes('afcat') ||
    target.includes('nda') ||
    title.includes('upsc cse') ||
    title.includes('upsc csat') ||
    title.includes('upsc cds') ||
    title.includes('upsc capf') ||
    title.includes('afcat') ||
    title.includes('nda & na')
  ) {
    return 'upsc_civil';
  }

  // Default fallback based on existing category or central
  if (main === 'competitive_state') return 'state_psc_all_28';
  if (main === 'entrance_exams') return 'engineering_jee_gate';
  return 'upsc_civil';
}

/**
 * Returns true if a given test belongs to the specified category filter.
 */
export function isTestInCategory(test: MockTest, categoryId: string): boolean {
  if (!categoryId || categoryId === 'all') return true;

  const resolvedCategory = test.resolvedCategory || classifyTestCategory(test);
  if (resolvedCategory === categoryId) return true;

  // Direct mainCategory match
  if (test.mainCategory === categoryId) return true;

  return false;
}
